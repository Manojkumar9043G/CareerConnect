import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from './PrivateHook/AuthContext';


export const LoginSection = () => {
      const navigate = useNavigate();
    const { login } = useAuth(); // Get login function from context

    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            
            const token = await response.text();
            if (response.ok) {
                localStorage.setItem("token", token);
                login();
                alert("Your email and password are correct");
                navigate("/home");
            } else {
                setIsError(true);
                setErrorMsg("Your email or password is incorrect.");
            }
        } catch (error) {
            alert("Something went wrong...");
            console.error(error);
        }
    };

    const handleInputChange = () => {
        if (isError) {
            setIsError(false);
            setErrorMsg("");
        }
    };

    // Your return JSX here...

    return (
        <div className="relative h-screen">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                            border-2 border-gray-200 w-4/5 h-3/4 rounded-2xl bg-gray-400 
                            shadow-xl shadow-black lg:w-[40%]">
                <h1 className="text-center text-3xl mt-2 text-white">Login</h1>

                <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
                    <div className="flex flex-col mt-8 w-2/3">
                        <label className="text-white">Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Ex: Manoj Kumar"
                            className="border border-black py-1.5 outline-none rounded pl-1.5 bg-white w-full mt-2.5"
                            required
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-col mt-8 w-2/3">
                        <label className="text-white">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Ex: John@123"
                            className="border border-black py-1.5 outline-none rounded pl-1.5 bg-white w-full mt-2"
                            required
                            onChange={handleInputChange}
                        />
                    </div>

                    {isError && (
                        <div className="text-red-500 text-center mt-2.5 font-medium">
                            {errorMsg}
                        </div>
                    )}

                    <div className="mt-10">
                        <button
                            type="submit"
                            className="border px-6 py-2 rounded bg-blue-600 text-white cursor-pointer shadow-sm shadow-blue-100
                                       hover:bg-white hover:text-blue-600 transition duration-150 ease-in-out active:scale-95"
                        >
                            Submit
                        </button>
                    </div>
                </form>

                <div className="flex justify-center mt-3">
                    <a className="text-blue-800 font-bold underline cursor-pointer active:text-blue-400">
                        Forgot Password?
                    </a>
                </div>
            </div>
        </div>
    );
};
