import React from 'react';
import {render} from 'react-dom';
//import Gallery from './gallery/gallery.jsx';
import Accordion from './accordion/accoridon.jsx';

var data = [
    {
        id: 1,
        name: "Gary Lintern",
        title: "President ",
        what_you_do: "Strategy & Content",
        spirtual_role: "Chief Yoda",
        best_day_imaginable: "Canoeing an interior lake in Algonquin one morning and waking up 24 hours later in the market square of an old European city. Unlikely to happen, but there you have it.",
        best_work_day: "When you can prove collaboration and capitalism aren't mutually exclusive. Or when the urge to jump for creative joy gets fulfilled without causing knee damage. And turning on the lights in the morning.",
        best_work: "Strategy and creative for Libro, Perrier, Canada's Credit Unions, Nature Clean, City of Mississauga, Cadillac Fairview, Mitel Corporation, Bruce County, Ernst & Young LLP, Siskinds, St. Joseph's Health Care Hamilton, Symantec (Egghead Software), Conservation Council of Ontario, Russell Investments and Evergreen."
    },
    {
        id: 2,
        name: "Henry Wong",
        title: "Vice-Presidente",
        what_you_do: "Creative Director",
        spirtual_role: "Cultural Ambassador",
        best_day_imaginable: "Canoeing an interior lake in Algonquin one morning and waking up 24 hours later in the market square of an old European city. Unlikely to happen, but there you have it.",
        best_work_day: "When you can prove collaboration and capitalism aren't mutually exclusive. Or when the urge to jump for creative joy gets fulfilled without causing knee damage. And turning on the lights in the morning.",
        best_work: "Strategy and creative for Libro, Perrier, Canada's Credit Unions, Nature Clean, City of Mississauga, Cadillac Fairview, Mitel Corporation, Bruce County, Ernst & Young LLP, Siskinds, St. Joseph's Health Care Hamilton, Symantec (Egghead Software), Conservation Council of Ontario, Russell Investments and Evergreen."
    },
    {
        id: 3,
        name: "Dan Rempel",
        title: "Director Digital",
        what_you_do: "Electronic Communications",
        spirtual_role: "Practical Philosopher",
        best_day_imaginable: "Canoeing an interior lake in Algonquin one morning and waking up 24 hours later in the market square of an old European city. Unlikely to happen, but there you have it.",
        best_work_day: "When you can prove collaboration and capitalism aren't mutually exclusive. Or when the urge to jump for creative joy gets fulfilled without causing knee damage. And turning on the lights in the morning.",
        best_work: "Strategy and creative for Libro, Perrier, Canada's Credit Unions, Nature Clean, City of Mississauga, Cadillac Fairview, Mitel Corporation, Bruce County, Ernst & Young LLP, Siskinds, St. Joseph's Health Care Hamilton, Symantec (Egghead Software), Conservation Council of Ontario, Russell Investments and Evergreen."
    },
    {
        id: 4,
        name: "jc Molina",
        title: "Sr. Art Director",
        what_you_do: "Multi-channel Creative + Design",
        spirtual_role: "Gym Bunny",
        best_day_imaginable: "Canoeing an interior lake in Algonquin one morning and waking up 24 hours later in the market square of an old European city. Unlikely to happen, but there you have it.",
        best_work_day: "When you can prove collaboration and capitalism aren't mutually exclusive. Or when the urge to jump for creative joy gets fulfilled without causing knee damage. And turning on the lights in the morning.",
        best_work: "Strategy and creative for Libro, Perrier, Canada's Credit Unions, Nature Clean, City of Mississauga, Cadillac Fairview, Mitel Corporation, Bruce County, Ernst & Young LLP, Siskinds, St. Joseph's Health Care Hamilton, Symantec (Egghead Software), Conservation Council of Ontario, Russell Investments and Evergreen."
    },
    {
        id: 5,
        name: "Christine Wong",
        title: "Sr. Art Director",
        what_you_do: "Multi-channel Creative + Design",
        spirtual_role: "Musical Nomand",
        best_day_imaginable: "Canoeing an interior lake in Algonquin one morning and waking up 24 hours later in the market square of an old European city. Unlikely to happen, but there you have it.",
        best_work_day: "When you can prove collaboration and capitalism aren't mutually exclusive. Or when the urge to jump for creative joy gets fulfilled without causing knee damage. And turning on the lights in the morning.",
        best_work: "Strategy and creative for Libro, Perrier, Canada's Credit Unions, Nature Clean, City of Mississauga, Cadillac Fairview, Mitel Corporation, Bruce County, Ernst & Young LLP, Siskinds, St. Joseph's Health Care Hamilton, Symantec (Egghead Software), Conservation Council of Ontario, Russell Investments and Evergreen."
    },
    {
        id: 6,
        name: "Katie Burns",
        title: "Project Manager, Media Specialist",
        what_you_do: "Planning everything + building it on time",
        spirtual_role: "Birthday Treat Maker",
        best_day_imaginable: "Canoeing an interior lake in Algonquin one morning and waking up 24 hours later in the market square of an old European city. Unlikely to happen, but there you have it.",
        best_work_day: "When you can prove collaboration and capitalism aren't mutually exclusive. Or when the urge to jump for creative joy gets fulfilled without causing knee damage. And turning on the lights in the morning.",
        best_work: "Strategy and creative for Libro, Perrier, Canada's Credit Unions, Nature Clean, City of Mississauga, Cadillac Fairview, Mitel Corporation, Bruce County, Ernst & Young LLP, Siskinds, St. Joseph's Health Care Hamilton, Symantec (Egghead Software), Conservation Council of Ontario, Russell Investments and Evergreen."
    },
    {
        id: 7,
        name: "Kerri Loudoun",
        title: "Project Manager",
        what_you_do: "Kepper of Details + Quality Assurance",
        spirtual_role: "Timbit Provider",
        best_day_imaginable: "Canoeing an interior lake in Algonquin one morning and waking up 24 hours later in the market square of an old European city. Unlikely to happen, but there you have it.",
        best_work_day: "When you can prove collaboration and capitalism aren't mutually exclusive. Or when the urge to jump for creative joy gets fulfilled without causing knee damage. And turning on the lights in the morning.",
        best_work: "Strategy and creative for Libro, Perrier, Canada's Credit Unions, Nature Clean, City of Mississauga, Cadillac Fairview, Mitel Corporation, Bruce County, Ernst & Young LLP, Siskinds, St. Joseph's Health Care Hamilton, Symantec (Egghead Software), Conservation Council of Ontario, Russell Investments and Evergreen."
    },
    {
        id: 8,
        name: "Michelle Flynn",
        title: "Account Planner",
        what_you_do: "Strategy + Project Management",
        spirtual_role: "Relationship Amplifier",
        best_day_imaginable: "Canoeing an interior lake in Algonquin one morning and waking up 24 hours later in the market square of an old European city. Unlikely to happen, but there you have it.",
        best_work_day: "When you can prove collaboration and capitalism aren't mutually exclusive. Or when the urge to jump for creative joy gets fulfilled without causing knee damage. And turning on the lights in the morning.",
        best_work: "Strategy and creative for Libro, Perrier, Canada's Credit Unions, Nature Clean, City of Mississauga, Cadillac Fairview, Mitel Corporation, Bruce County, Ernst & Young LLP, Siskinds, St. Joseph's Health Care Hamilton, Symantec (Egghead Software), Conservation Council of Ontario, Russell Investments and Evergreen."
    },
    {
        id: 9,
        name: "Steve Priebe",
        title: "Senior Designer",
        what_you_do: "Visual Communicator",
        spirtual_role: "Reliable Doorman",
        best_day_imaginable: "Canoeing an interior lake in Algonquin one morning and waking up 24 hours later in the market square of an old European city. Unlikely to happen, but there you have it.",
        best_work_day: "When you can prove collaboration and capitalism aren't mutually exclusive. Or when the urge to jump for creative joy gets fulfilled without causing knee damage. And turning on the lights in the morning.",
        best_work: "Strategy and creative for Libro, Perrier, Canada's Credit Unions, Nature Clean, City of Mississauga, Cadillac Fairview, Mitel Corporation, Bruce County, Ernst & Young LLP, Siskinds, St. Joseph's Health Care Hamilton, Symantec (Egghead Software), Conservation Council of Ontario, Russell Investments and Evergreen."
    },
    {
        id: 10,
        name: "Insu Mun",
        title: "Web Developer ",
        what_you_do: "Development + Coding",
        spirtual_role: "Lunch Lover",
        best_day_imaginable: "Canoeing an interior lake in Algonquin one morning and waking up 24 hours later in the market square of an old European city. Unlikely to happen, but there you have it.",
        best_work_day: "When you can prove collaboration and capitalism aren't mutually exclusive. Or when the urge to jump for creative joy gets fulfilled without causing knee damage. And turning on the lights in the morning.",
        best_work: "Strategy and creative for Libro, Perrier, Canada's Credit Unions, Nature Clean, City of Mississauga, Cadillac Fairview, Mitel Corporation, Bruce County, Ernst & Young LLP, Siskinds, St. Joseph's Health Care Hamilton, Symantec (Egghead Software), Conservation Council of Ontario, Russell Investments and Evergreen."
    },
    {
        id: 11,
        name: "Shufei Gong",
        title: "Web Developer",
        what_you_do: "Developement + Coding",
        spirtual_role: "Digital Translator",
        best_day_imaginable: "Canoeing an interior lake in Algonquin one morning and waking up 24 hours later in the market square of an old European city. Unlikely to happen, but there you have it.",
        best_work_day: "When you can prove collaboration and capitalism aren't mutually exclusive. Or when the urge to jump for creative joy gets fulfilled without causing knee damage. And turning on the lights in the morning.",
        best_work: "Strategy and creative for Libro, Perrier, Canada's Credit Unions, Nature Clean, City of Mississauga, Cadillac Fairview, Mitel Corporation, Bruce County, Ernst & Young LLP, Siskinds, St. Joseph's Health Care Hamilton, Symantec (Egghead Software), Conservation Council of Ontario, Russell Investments and Evergreen."
    },
    {
        id: 12,
        name: "Bev Rock",
        title: "Media Director",
        what_you_do: "Structuring paid advertising campaigns",
        spirtual_role: "Company Baker",
        best_day_imaginable: "Canoeing an interior lake in Algonquin one morning and waking up 24 hours later in the market square of an old European city. Unlikely to happen, but there you have it.",
        best_work_day: "When you can prove collaboration and capitalism aren't mutually exclusive. Or when the urge to jump for creative joy gets fulfilled without causing knee damage. And turning on the lights in the morning.",
        best_work: "Strategy and creative for Libro, Perrier, Canada's Credit Unions, Nature Clean, City of Mississauga, Cadillac Fairview, Mitel Corporation, Bruce County, Ernst & Young LLP, Siskinds, St. Joseph's Health Care Hamilton, Symantec (Egghead Software), Conservation Council of Ontario, Russell Investments and Evergreen."
    },
    {
        id: 13,
        name: "Sandra Lumb",
        title: "Financial Manager",
        what_you_do: "Bookkeeping",
        spirtual_role: "Mathematical Sherpa",
        best_day_imaginable: "Canoeing an interior lake in Algonquin one morning and waking up 24 hours later in the market square of an old European city. Unlikely to happen, but there you have it.",
        best_work_day: "When you can prove collaboration and capitalism aren't mutually exclusive. Or when the urge to jump for creative joy gets fulfilled without causing knee damage. And turning on the lights in the morning.",
        best_work: "Strategy and creative for Libro, Perrier, Canada's Credit Unions, Nature Clean, City of Mississauga, Cadillac Fairview, Mitel Corporation, Bruce County, Ernst & Young LLP, Siskinds, St. Joseph's Health Care Hamilton, Symantec (Egghead Software), Conservation Council of Ontario, Russell Investments and Evergreen."
    },
    {
        id: 14,
        name: "Olivia Lintern",
        title: "Project Manager",
        what_you_do: "Project Management + Copywriting",
        spirtual_role: "Kiwidian",
        best_day_imaginable: "Canoeing an interior lake in Algonquin one morning and waking up 24 hours later in the market square of an old European city. Unlikely to happen, but there you have it.",
        best_work_day: "When you can prove collaboration and capitalism aren't mutually exclusive. Or when the urge to jump for creative joy gets fulfilled without causing knee damage. And turning on the lights in the morning.",
        best_work: "Strategy and creative for Libro, Perrier, Canada's Credit Unions, Nature Clean, City of Mississauga, Cadillac Fairview, Mitel Corporation, Bruce County, Ernst & Young LLP, Siskinds, St. Joseph's Health Care Hamilton, Symantec (Egghead Software), Conservation Council of Ontario, Russell Investments and Evergreen."
    }
];


//render(<Gallery />, document.getElementById('gallery-container'));
render(<Accordion data={data} />, document.getElementById('accordion-container'));


