import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtVerify } from "jose";

interface JwtPayload {
	email: string
}

const useAuth = () => {
	const [loginUserEmail, setLoginUserEmail] = useState<string>("");
	const router = useRouter();
	useEffect(() => {
		const checkToken = async() => {
			console.log("呼ばれてる");
			const token = localStorage.getItem("token");
			if(!token){
				router.push("/user/login");
				return;
			}
			try {
				const secretKey = new TextEncoder().encode("next-blog");
				const decodedJwt = await jwtVerify(token, secretKey) as { payload: JwtPayload };
				setLoginUserEmail(decodedJwt.payload.email);
			} catch(err) {
				router.push("/user/login");
				return;
			}
		}
		checkToken();
	}, [router]);
	return loginUserEmail;
}

export default useAuth;