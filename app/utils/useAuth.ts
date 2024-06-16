import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtVerify } from "jose";
import { useToast } from "@/components/ui/use-toast";

interface JwtPayload {
	email: string
}

const useAuth = () => {
	const [loginUserEmail, setLoginUserEmail] = useState<string>("");
	const toast = useToast();
	const router = useRouter();
	useEffect(() => {
		const checkToken = async() => {
			const token = localStorage.getItem("token");
			if(!token){
				toast.toast({
					title: "ログインしてください",
					variant: "destructive",
				});
				router.push("/user/login");
				return;
			}
			try {
				const secretKey = new TextEncoder().encode("next-blog");
				const decodedJwt = await jwtVerify(token, secretKey) as { payload: JwtPayload };
				setLoginUserEmail(decodedJwt.payload.email);
			} catch(err) {
				toast.toast({
					title: "ログインしてください",
					variant: "destructive",
				});
				router.push("/user/login");
				return;
			}
		}
		checkToken();
	}, [router]);
	return loginUserEmail;
}

export default useAuth;