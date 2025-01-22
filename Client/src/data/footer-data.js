import { FaLocationDot } from "react-icons/fa6";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";


export const footerQuickLinks = [
    {
        quickLink: "Home",
        path: "/"
    },
    {
        quickLink: "About",
        path: "/about"
    },
    {
        quickLink: "Appointment",
        path: "/appointment"
    },
];

export const footerHours = [
    {
        day: "Monday",
        time: "9:00am - 11:00pm"
    },
    {
        day: "Tuesday",
        time: "9:00am - 11:00pm"
    },
    {
        day: "Wednesday",
        time: "9:00am - 11:00pm"
    },
    {
        day: "Thursday",
        time: "9:00am - 11:00pm"
    },
    {
        day: "Friday",
        time: "9:00am - 11:00pm"
    },
    {
        day: "Saturday",
        time: "9:00am - 11:00pm"
    },
    {
        day: "Sunday",
        time: "Closed"
    },
]

export const footerContact = [
    {
        icon: BsFillTelephoneForwardFill,
        text: "+91 123-456-7890"
    },
    {
        icon: MdEmail,
        text: "example@gmail.com"
    },
    {
        icon: FaLocationDot,
        text: "Delhi, India"
    }

]