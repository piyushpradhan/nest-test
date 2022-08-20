import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post('/register')
	async addUser(
		@Body('passowrd') userPassword: string,
		@Body('username') username: string
	) {
		const saltOrRounds = 10;
		const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);
		const result = await this.usersService.insertUser(username, hashedPassword);
		return {
			msg: 'User registered successfully',
			userId: result.id,
			username: result.username
		};
	}
}
