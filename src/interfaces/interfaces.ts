export interface IPost {
	id: string;
	url: string;
	description: string;
}

export interface ILink {
	link: IPost
}

export interface ILinkList {
	feed:
		{
			links: IPost[];
		}
}

export interface  IState  {
	login?: boolean;
	email?: string;
	password?: string;
	name?: string;
};

interface  IToken{
	token: string
}

export type ILogData  = {
	login: IToken

} | {
	signup: IToken
}

