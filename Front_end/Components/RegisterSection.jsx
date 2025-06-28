import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterSection = () => {

    const [Email,setEmail] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target); 
        const data = {};
        formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch("http://localhost:8080/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const message = await response.text();

        if (response.ok) {
            navigate('/');
        } else {
            setEmail(true);
        }
        } catch (error) {
            alert("Something went wrong, please try again!");
            console.error("Fetch error:", error);
        }
    };


    return (
        <div className="relative h-screen">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                            border-2 border-gray-200 w-4/5 h-3/4 rounded-2xl bg-gray-400 
                            shadow-xl shadow-black lg:w-[40%]">
                <h1 className="text-center text-3xl mt-2 text-white">Register</h1>
                
                <form onSubmit={handleSubmit} className="flex flex-col items-center w-full mt-3">

                    <div className="flex flex-col mt-2 w-2/3">
                        <label>User Name</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Ex: Manoj Kumar"
                            className="border border-black py-1.5 outline-none rounded pl-1.5 bg-white w-full mt-2.5"
                            required
                        />

                        {/* <div className="text-[13px] text-red-600 text-center mt-1"> *This user name already used try other..</div> */}
                    </div>

                    <div className="flex flex-col mt-2 w-2/3">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Ex: kai@123gmail.com"
                            className="border border-black py-1.5 outline-none rounded pl-1.5 bg-white w-full mt-2"
                            required
                        />
                         <div className= {Email ? "text-[13px] text-red-600 text-center mt-1" : "hidden"}> *This Email already used try other..</div>
                    </div>
                    

                    <div className="flex flex-col mt-2 w-2/3">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Ex: John@123"
                            className="border border-black py-1.5 outline-none rounded pl-1.5 bg-white w-full mt-2"
                            required
                        />
                        
                    </div>

                    <div className="mt-5">
                        <button
                            type="submit"
                            className="border px-6 py-2 rounded bg-blue-300 text-white cursor-pointer shadow-sm shadow-blue-100
                                       hover:bg-white hover:text-blue-300 transition duration-100 ease-in-out active:scale-95"
                        >
                            Submit
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};


    
