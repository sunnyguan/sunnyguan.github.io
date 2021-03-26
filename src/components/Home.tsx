import { Link } from "react-router-dom";
import Icons from "./Icons";
import Picture from "./SunnyGuan.jpeg";

function Home() {
  return (
    <div className="min-h-screen full flex item-center justify-center">
      <div className="my-auto text-center px-8 py-8 grid gap-2 bg-blue-200 shadow-2xl rounded-3xl">
        <div className="sm:flex">
          <div className="left">
            <img
              src={Picture}
              className="rounded-full mx-auto w-48 mb-1"
              alt="Sunny Guan"
            />
            <h1 className="text-2xl sm:text-3xl font-light">Sunny Guan</h1>
            <Icons />
          </div>
          <div className="flex-1 text-left sm:pl-8 place-self-center w-72 sm:w-80">
            <div className="font-bold">Education</div>
            <div className="font-light col-span-2 flex">
              <div className="flex-1">UT Dallas</div>2020 - 2023
            </div>

            <div className="font-bold">Experiences</div>
            <div className="font-light col-span-2 flex">
              <div className="flex-1">Virtu Financial</div>Fall 2021
            </div>
            <div className="font-light col-span-2 flex">
              <div className="flex-1">Amazon</div>Summer 2021
            </div>

            <div className="font-bold">Extracurriculars</div>
            <div className="font-light col-span-2 flex">
              <div className="flex-1">Head of Tech</div>FinTech UTD
            </div>
            <div className="font-light col-span-2 flex">
              <div className="flex-1">Research Lead</div>ACM Research
            </div>
            <div className="font-light col-span-2 flex">
              <div className="flex-1">Developer</div>ACM Development
            </div>
            <div className="w-full flex mt-4">
              <Link
                to="/blog"
                className="p-1 mx-auto font-light text-white text-md bg-blue-500 rounded-lg w-24 hover:bg-blue-600 text-center ml-0"
              >
                blog
              </Link>
              <Link
                to="/bio"
                className="p-1 mx-auto font-light text-white text-md bg-indigo-500 rounded-lg w-24 hover:bg-blue-600 text-center mr-0"
              >
                more info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
