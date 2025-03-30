interface ICard {
	_id: string;
	/* personal */
	firstName: string;
	lastName: string;
	phone?: string;
	email?: string;
	/* company */
	companyLogo?: string;
	companyName: string;
	companyPosition?: string;
	companyWebsite?: string;
	companyDescription?: string;
}

export type { ICard };
