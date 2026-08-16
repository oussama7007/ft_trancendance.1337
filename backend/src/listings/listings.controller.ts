import { Controller, Get } from '@nestjs/common';

@Controller('listings')
export class ListingsController {
    
    @Get()
    getlistnings()
    {
        return 'listin endpoint works';
    }
}

