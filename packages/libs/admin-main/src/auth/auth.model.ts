import * as Yup from 'yup';


export class LogInParam {
	static emailRule = Yup.string()
		.email('Email không hợp lệ')
		.required('Vui lòng nhập email');

	static passwordRule = Yup.string()
		.required('Vui lòng nhập mật khẩu');

	static modelRule = Yup.object().shape({
		email: LogInParam.emailRule,
		password: LogInParam.passwordRule,
	});


	public email: string;
	public password: string;

	constructor(source: any) {
		Object.assign(this, source);
	}
}

export class LogInResult {
	public authToken?: string;
	public tokenExpiresAt?: number;
	public user?: LoggedInUser;

	constructor(source: any) {
		Object.assign(this, source);
		this.user = new LoggedInUser(source.user);
	}
}

export class LoggedInUser {
	public email: string;
	public roles: string[];

	public hasRole(role: string): boolean {
		return this.roles.includes(role);
	}

	constructor(source: any) {
		Object.assign(this, source);
	}
}
