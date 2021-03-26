import Background from "./golden_gate_1.jpg";

function Bio() {
  return (
    <div
      className="bg-fixed bg-no-repeat bg-cover"
      style={{ backgroundImage: "url(" + Background + ")" }}
    >
      <div className="w-full p-4 flex min-h-screen">
        <h1 className="m-auto font-medium tracking-wide text-center">
          <p className="text-4xl">Sunny Guan</p>
          <div className="text-lg m-auto mb-4">
            <p>CS @ UT Dallas, Expected 2023</p>
          </div>
          {/* <div className="flex justify-center mt-12">
            <img
              src="arrow.svg"
              className="animate-bounce w-6 h-6 text-amber-900"
            />
          </div> */}
        </h1>
      </div>
      <div className="bg-red-200 w-full py-12 px-4 md:flex font-light">
        <div className="md:w-1/4 text-center text-2xl my-auto pb-4 md:pb-0">
          Projects
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex w-full">
          <div className="h-72 p-4 bg-red-300 w-full flex rounded-xl shadow-md">
            <div className="m-auto text-center mx-4 w-full">
              <p className="text-xl font-medium mb-2">Comet Planning</p>
              <p className="text-md">
                Comet Planning is a comprehensive degree planning tool for UTD
                students.
              </p>
            </div>
          </div>
          <div className="h-72 p-4 bg-red-300 w-full flex rounded-xl shadow-md">
            <div className="m-auto text-center mx-4 w-full">
              <p className="text-xl font-medium mb-2">Whiteboard</p>
              <p className="text-md">
                Whiteboard is a modern UI overhaul of UTD's Learning Management
                System, eLearning.
              </p>
            </div>
          </div>
          <div className="h-72 p-4 bg-red-300 w-full flex rounded-xl shadow-md">
            <div className="m-auto text-center mx-4 w-full">
              <p className="text-xl font-medium mb-2">
                VR User Behavior Analysis
              </p>
              <p className="text-md">
                Researching user behavior in Virtual Reality environments under
                Dr. Ravi Prakash.
              </p>
            </div>
          </div>
          <div className="h-72 p-4 bg-red-300 w-full flex rounded-xl shadow-md">
            <div className="m-auto text-center mx-4 w-full">
              <p className="text-xl font-medium mb-2">Past Projects</p>
              <a
                href="https://utdallas.edu/~sunny.guan"
                className="px-4 py-2 mx-auto font-light text-white tracking-wide text-md md:text-lg bg-red-500 rounded-lg w-24 place-self-center hover:bg-red-600"
              >
                visit
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-pink-200 w-full py-12 px-4 md:flex font-light">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex w-full">
          <div className="h-72 p-4 bg-pink-300 w-full flex rounded-xl shadow-md">
            <div className="m-auto text-center mx-4 w-full">
              <p className="text-xl font-medium mb-2">Resume</p>
              <a
                href="SunnyGuan_Resume.pdf"
                className="px-4 py-2 mx-auto font-light text-white tracking-wide text-md md:text-lg bg-pink-500 rounded-lg w-24 place-self-center hover:bg-pink-600"
              >
                visit
              </a>
            </div>
          </div>
          <div className="h-72 p-4 bg-pink-300 w-full flex rounded-xl shadow-md">
            <div className="m-auto text-center mx-4 w-full">
              <p className="text-xl font-medium">Virtu Financial</p>
              <p className="text-md text-gray-800 mb-2">Fall 2021</p>
              <p className="text-md">
                Incoming trading systems developer intern in Austin, TX.
              </p>
            </div>
          </div>
          <div className="h-72 p-4 bg-pink-300 w-full flex rounded-xl shadow-md">
            <div className="m-auto text-center mx-4 w-full">
              <p className="text-xl font-medium">Amazon</p>
              <p className="text-md text-gray-800 mb-2">Summer 2021</p>
              <p className="text-md">
                Incoming software development engineer intern in Seattle, WA.
              </p>
            </div>
          </div>
          <div className="h-72 p-4 bg-pink-300 w-full flex rounded-xl shadow-md">
            <div className="m-auto text-center mx-4 w-full">
              <p className="text-xl font-medium">The Coder School</p>
              <p className="text-md text-gray-800 mb-2">Dec 2019 - Aug 2020</p>
              <p className="text-md">
                Computer science tutor teaching Java, Python, and AP CS.
              </p>
            </div>
          </div>
        </div>
        <div className="md:w-1/4 text-center my-auto pt-4 md:pt-0">
          <p className="text-2xl">Work Experience</p>
        </div>
      </div>
      <div className="bg-red-200 w-full py-12 px-4 md:flex font-light">
        <div className="md:w-1/4 text-center text-2xl my-auto pb-4 md:pb-0">
          Achievements
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex w-full">
          <div className="h-72 p-4 bg-red-300 w-full flex rounded-xl shadow-md">
            <div className="m-auto text-center mx-4 w-full">
              <p className="text-xl font-medium mb-2">
                National Merit Finalist
              </p>
              <p className="text-md">
                Full scholarship for performance on PSAT (1500/1520) and SAT
                (1580/1600)
              </p>
            </div>
          </div>
          <div className="h-72 p-4 bg-red-300 w-full flex rounded-xl shadow-md">
            <div className="m-auto text-center mx-4 w-full">
              <p className="text-xl font-medium mb-2">AIME Qualifier</p>
              <p className="text-md">
                3x (2018‑2020) qualifier for the American Invitational
                Mathematics Exam
              </p>
            </div>
          </div>
          <div className="h-72 p-4 bg-red-300 w-full flex rounded-xl shadow-md">
            <div className="m-auto text-center mx-4 w-full">
              <p className="text-xl font-medium mb-2">USA Computing Olympiad</p>
              <p className="text-md">Participant in Gold Divison</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full font-light flex flex-wrap content-center bg-red-300 p-4">
        <p className="text-center m-auto text-xs">
          All Rights Reserved. Graphics design is my passion.
        </p>
      </div>
    </div>
  );
}

export default Bio;
