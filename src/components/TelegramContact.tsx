'use client';
import { SubmitHandler, useForm } from "react-hook-form";
import scss from "./TelegramContact.module.scss";
import axios from 'axios'

interface IFormTelegram{
	username: string,
	email: string,
	subject: string,
	description: string,
}
const TelegramContact = () => {
	const {register, handleSubmit} = useForm<IFormTelegram>()
	const TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN
	const CHAT_ID = process.env.NEXT_PUBLIC_TG_CHAT_ID
	console.log(TOKEN);
	console.log(CHAT_ID);
	
	const messageModel  = (data: IFormTelegram)=> {
		let messageTG = `UserName: <b>${data.username}</b>\n`
		messageTG += `'Email Address: <b>${data.email}</b>\n`
		messageTG += `'Subject: <b>${data.subject}</b>\n`
		messageTG += `'Description': <b>${data.description}</b>`
		return messageTG
	}
	const onSubmit: SubmitHandler<IFormTelegram> = async (data)=> {
		const message = messageModel(data)
		console.log(message);
		
		await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
			chat_id: CHAT_ID,
			parse_mode: "html",
			text: messageModel(data)
		});
		
	}
	return (
		<div className={scss.TelegramContact}>
			<div className="container">
				<div className={scss.content}>
					<h1>TelegramContact</h1>
					<form onSubmit={handleSubmit(onSubmit)} className={scss.forms}>
					<input type="text" placeholder="UserName" {...register('username', {required: true})}/>
					<input type="text" placeholder="email" {...register('email', {required: true})}/>
					<input type="text" placeholder="Subject" {...register('subject', {required: true})}/>
					<input type="text" placeholder="Description" {...register('description', {required: true})}/>
					<button type="submit">Submit</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default TelegramContact;
