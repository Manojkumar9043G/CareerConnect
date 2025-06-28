import { useEffect, useState } from "react";
import { FaPlus, FaSave } from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import { IoCloseCircleSharp } from "react-icons/io5";
import { MdEdit, MdDelete } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

export const HomeSection = () => {
    const [form, setForm] = useState(false);
    const [users, setUsers] = useState([]); // Dummy users array
    
    const token = localStorage.getItem("token");

    useEffect(()=>{
        fetch("http://localhost:8080/userPosts",{
            method: "GET",
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data =>{
            setUsers(data);
            console.log(data);
        })
    },[])

    const [formData, setFormData] = useState({
        name: "",
        college: "",
        course: "",
        resume: "",
        score: "",
        gender: "",
        image: null
    });

    const handleInputChange = (e) => {
        const {name, value, type, files} = e.target;
        setFormData((prev)=>({
            ...prev,
            [name]: type === "file" ? files[0] : value
        }));
    }

    const deleteValue = async () => {
        alert("hi");
        try {
            const response = await fetch("http://localhost:8080/deletePost", {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                alert("Deleted successfully");
            } else {
                alert("Delete failed");
            }
        } catch (error) {
            alert("Error: " + error.message);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();


        const payload = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            payload.append(key, value);
        });

        try {
            const response = await fetch("http://localhost:8080/usersDetails", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    // Do not set 'Content-Type' manually when using FormData
                },
                body: payload,
            });

            if (response.ok) {
                setUsers((prev) => [...prev, formData]);
                setForm(false);
            } else {
                const errorData = await response.text();
                console.error("Backend error:", errorData);
                alert("Failed to submit data: " + errorData);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong.");
        }

        setFormData({
            id:"",
            name: "",
            college: "",
            course: "",
            resume: "",
            score: "",
            gender: "",
            image: null,
        });
    };


    return (
        <>
            <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto mt-10 p-4 gap-4">
                <div
                    className="w-full md:w-1/5 flex justify-center shadow-2xl items-center cursor-pointer bg-green-300 rounded-2xl h-24"
                    onClick={() => setForm(true)}
                >
                    <FaPlus className="text-white text-2xl" />
                </div>

                <div className="flex flex-col w-full space-y-4">
                    {users.map((user, index) => (
                        <div key={index} className="w-full border rounded-2xl p-4 flex flex-col md:flex-row gap-4 shadow-neutral-300 shadow-2xl">
                            <div className="border w-full md:w-1/5 h-40 rounded flex justify-center items-center">
                                <img
                                    src={user.image || "https://via.placeholder.com/150"}
                                    alt="Profile"
                                    className="object-cover h-full w-full rounded"
                                />
                            </div>

                            <div className="flex flex-col w-full">
                                <div className="flex flex-col md:flex-row justify-around mt-2 space-y-4 md:space-y-0 md:space-x-4">
                                    <div className="space-y-3 text-center md:text-left">
                                        <div>{user.name}</div>
                                        <div>{user.college}</div>
                                        <div>{user.course}</div>
                                    </div>
                                    <div className="space-y-3 text-center md:text-left">
                                        <div>{user.gender}</div>
                                        <div>Score: {user.score}</div>
                                        <a
                                            href={user.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="border flex items-center justify-center space-x-2 h-10 rounded cursor-pointer px-3"
                                        >
                                            <IoIosDocument />
                                            <span>Resume</span>
                                        </a>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row justify-around mt-4 space-y-2 md:space-y-0 md:space-x-4">
                                    <div className="flex items-center justify-center border py-2 px-5 rounded bg-amber-500 text-white cursor-pointer">
                                        <MdEdit className="mr-1" /> Edit
                                    </div>
                                    <div className="flex items-center justify-center border py-2 px-5 rounded bg-green-500 text-white cursor-pointer">
                                        <FaSave className="mr-1" /> Save
                                    </div>
                                    <button 
                                        onClick={deleteValue}
                                        className="flex items-center justify-center border py-2 px-5 rounded bg-red-500 text-white cursor-pointer"
                                    >
                                        <MdDelete className="mr-1" /> 
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {form && (
                    <motion.form
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleSubmit}
                        className="w-[90%] max-w-lg h-[90vh] md:h-auto absolute top-1/2 left-1/2 
                            -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-200 
                            rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                        <div className="flex justify-between items-center px-6 py-4 border-b bg-gradient-to-r from-indigo-500 to-purple-500">
                            <h2 className="text-white text-xl font-bold">Add Your Details</h2>
                            <IoCloseCircleSharp
                                className="text-3xl text-white hover:text-red-200 active:scale-95 cursor-pointer"
                                onClick={() => setForm(false)}
                            />
                        </div>

                        <div className="overflow-y-auto max-h-[calc(90vh-64px)] px-6 py-6 space-y-5 bg-white">
                            {[
                                { label: "Enter Your Name", name: "name", type: "text", required: true },
                                { label: "Enter Your College Name", name: "college", type: "text", required: true },
                                { label: "Enter Your Course Name", name: "course", type: "text", required: true },
                                { label: "Resume URL", name: "resume", type: "text", required: false },
                                { label: "Total Score", name: "score", type: "number", required: true },
                            ].map(({ label, name, type, required }) => (
                                <div key={name}>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
                                    <input
                                        type={type}
                                        name={name}
                                        required={required}
                                        value={formData[name]}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                    />
                                </div>
                            ))}

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
                                <select
                                    name="gender"
                                    required
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                >
                                    <option value="">Select Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Profile Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full py-2 text-white font-semibold bg-indigo-600 rounded-lg hover:bg-indigo-700 active:scale-[0.98] transition duration-200"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>
        </>
    );
};
