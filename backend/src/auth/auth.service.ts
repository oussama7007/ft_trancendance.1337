import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';


import { User } from '../users/user.entity';
import { UserContact } from '../users/user-contact.entity';


import * as bcrypt from 'bcrypt';
import { DataSource, IsNull, Not, Repository } from 'typeorm';

import { FinishRegistrationDto } from './dto/finish-registration.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { RegistrationSession } from './registration-session.entity';
import { VerificationChallenge } from './verification-challenge.entity';
import { StartRegistrationDto } from './dto/start-registration.dto';
import { RegisterContactDto } from './dto/register-contact.dto';
import { VerifyRegistrationDto } from './dto/verify-registration.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RegistrationSession)
    private readonly registrationSessionRepository:
      Repository<RegistrationSession>,

    @InjectRepository(VerificationChallenge)
    private readonly verificationChallengeRepository:
      Repository<VerificationChallenge>,


      @InjectRepository(User)
      private readonly userRepository: Repository<User>,

      @InjectRepository(UserContact)
      private readonly userContactRepository: Repository<UserContact>,

      private readonly dataSource: DataSource,
  ) {}

  async startRegistration(dto: StartRegistrationDto) {
    const session = this.registrationSessionRepository.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      dateOfBirth: dto.dateOfBirth,
      cin: dto.cin ?? null,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    });

    const savedSession =
      await this.registrationSessionRepository.save(session);

    return {
      registrationSessionId: savedSession.id,
    };
  }

  async registerContact(dto: RegisterContactDto) {
    const session =
      await this.registrationSessionRepository.findOne({
        where: {
          id: dto.registrationSessionId,
        },
      });

    if (!session) {
      throw new NotFoundException(
        'Registration session not found',
      );
    }

    if (session.expiresAt < new Date()) {
      throw new BadRequestException(
        'Registration session has expired',
      );
    }

    const challenge =
      this.verificationChallengeRepository.create({
        registrationSessionId: session.id,
        type: dto.type,
        destination: dto.value,
        codeHash: '0000',
        attempts: 0,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        verifiedAt: null,
      });

    await this.verificationChallengeRepository.save(challenge);

    return {
      message: 'Verification code sent',
      verificationChallengeId: challenge.id,
    };
  }

  async verifyRegistration(dto: VerifyRegistrationDto) {
    const session =
      await this.registrationSessionRepository.findOne({
        where: {
          id: dto.registrationSessionId,
        },
      });

    if (!session) {
      throw new NotFoundException(
        'Registration session not found',
      );
    }

    if (session.expiresAt < new Date()) {
      throw new BadRequestException(
        'Registration session has expired',
      );
    }

    const challenge =
      await this.verificationChallengeRepository.findOne({
        where: {
          registrationSessionId: session.id,
        },
        order: {
          createdAt: 'DESC',
        },
      });

    if (!challenge) {
      throw new NotFoundException(
        'Verification challenge not found',
      );
    }

    if (challenge.expiresAt < new Date()) {
      throw new BadRequestException(
        'Verification code has expired',
      );
    }

    if (challenge.verifiedAt) {
      throw new BadRequestException(
        'Verification code has already been used',
      );
    }

    if (challenge.attempts >= 5) {
      throw new BadRequestException(
        'Too many verification attempts',
      );
    }

    challenge.attempts += 1;

    if (dto.code !== challenge.codeHash) {
      await this.verificationChallengeRepository.save(
        challenge,
      );

      throw new BadRequestException(
        'Invalid verification code',
      );
    }

    challenge.verifiedAt = new Date();

    await this.verificationChallengeRepository.save(
      challenge,
    );

    return {
      message: 'Registration verified successfully',
    };
  }
  async finishRegistration(dto: FinishRegistrationDto) {
  const session =
    await this.registrationSessionRepository.findOne({
      where: {
        id: dto.registrationSessionId,
      },
    });

  if (!session) {
    throw new NotFoundException(
      'Registration session not found',
    );
  }

  if (session.expiresAt < new Date()) {
    throw new BadRequestException(
      'Registration session has expired',
    );
  }

  const challenge =
    await this.verificationChallengeRepository.findOne({
      where: {
        registrationSessionId: session.id,
        verifiedAt: Not(IsNull()),
      },
      order: {
        createdAt: 'DESC',
      },
    });

  if (!challenge) {
    throw new BadRequestException(
      'Registration has not been verified',
    );
  }

  if (dto.password !== dto.passwordConfirmation) {
    throw new BadRequestException(
      'Passwords do not match',
    );
  }

  const passwordHash = await bcrypt.hash(
    dto.password,
    12,
  );

  const queryRunner =
    this.dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const user = queryRunner.manager.create(User, {
      firstName: session.firstName,
      lastName: session.lastName,
      dateOfBirth: session.dateOfBirth,
      cin: session.cin,
      passwordHash,
    });

    const savedUser =
      await queryRunner.manager.save(User, user);

    const contact =
      queryRunner.manager.create(UserContact, {
        type: challenge.type,
        value: challenge.destination,
        verifiedAt: challenge.verifiedAt,
        userId: savedUser.id,
      });

    await queryRunner.manager.save(
      UserContact,
      contact,
    );

    await queryRunner.commitTransaction();

    return {
      message: 'Account created successfully',
      userId: savedUser.id,
    };
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
}
}