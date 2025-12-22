import React, { useState } from 'react';

const EnquiryForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        pincode: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="bg-white border border-[#EAEAEA] shadow-none rounded-none p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Need help with your painting needs?</h3>
            <p className="text-sm text-gray-600 mb-6">
                Fill the form below to book an appointment with an in house interior designer.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name*"
                    className="w-full py-3 border-none border-b border-gray-300 focus:border-brand-purple outline-none text-sm bg-transparent transition-colors rounded-none"
                    value={formData.name}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email*"
                    className="w-full py-3 border-none border-b border-gray-300 focus:border-brand-purple outline-none text-sm bg-transparent transition-colors rounded-none"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="tel"
                    name="mobile"
                    placeholder="Enter mobile number*"
                    className="w-full py-3 border-none border-b border-gray-300 focus:border-brand-purple outline-none text-sm bg-transparent transition-colors rounded-none"
                    value={formData.mobile}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode*"
                    className="w-full py-3 border-none border-b border-gray-300 focus:border-brand-purple outline-none text-sm bg-transparent transition-colors rounded-none"
                    value={formData.pincode}
                    onChange={handleChange}
                />


                <button
                    type="submit"
                    className="w-full bg-[#5E2E85] text-white font-bold text-sm tracking-widest py-4 mt-6 hover:bg-opacity-90 transition-all uppercase rounded-[2px]"
                >
                    ENQUIRE NOW
                </button>
            </form>
        </div>
    );
};

export default EnquiryForm;
