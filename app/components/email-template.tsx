interface EmailTemplateProps {
	loginUserEmail: string,
  content: string;
}

export const EmailTemplate = ({ loginUserEmail, content }: EmailTemplateProps) => (
  <div>
		<h3>{loginUserEmail}からの問い合わせ</h3>
    <p>{content}</p>
  </div>
);