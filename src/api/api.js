import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

export const uploadEmployeeFile = async (file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await API.post("/employees/upload", formData);

        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error uploading file:", error);
        return {
            success: false,
            error: error.response?.data?.error || "Something Went Wrong. Re-Upload the File",
        };
    }
};

export const assignFile = async (formData) => {
    try {
        const response = await API.post("/santa/assign", formData);

        return response.data; 
    } catch (error) {
        console.error("Error assigning file:", error);
        return { status: false, error: error?.response?.data?.error || "Something went wrong. Please try again." };
    }
};


export const downloadFile = async () => {
    try {
        const response = await API.get("/santa/download", {
            responseType: "blob",
        });

        if (response) {
            const blob = new Blob([response.data], { type: "application/octet-stream" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;

            const date = new Date();
            const month = date.toLocaleString("en-US", { month: "short" });
            const year = date.getFullYear();
            a.download = `Secret_Santa_Game_Result_${month}-${year}`;

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            return { success: true, message: "File downloaded successfully" };
        }
    } catch (error) {
        console.error("Error downloading file:", error);
        return { success: false, message: "Failed to download file", error };
    }
};