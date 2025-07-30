import { Link } from "react-router-dom";

export const ContactUs = () => {
  return (
    <div>
      <div>
        <header className="bg-green-700/90 text-white flex justify-between items-center px-12 py-4 shadow-md sticky top-0 z-50 backdrop-blur-sm">
          <div className="text-5xl font-extrabold tracking-wider py-2">
            FarMart
          </div>
          <div className="flex items-center gap-4 mr-10">
            <Link
              to="/"
              className="hover:underline hover:text-green-300 transition"
            >
              Home
            </Link>
            <Link
              to="/browse"
              className="hover:underline hover:text-green-300 transition"
            >
              Browse Animals
            </Link>
            <Link to="/animals/add">
              <p className="text-black font-bold">Add Animal</p>
            </Link>
            <Link to="/cart" aria-label="View shopping cart">
              <img
                src="/src/images/shopping_cart_24dp_1F1F1F_FILL1_wght400_GRAD200_opsz24.svg"
                alt="Cart"
                title="Cart"
              />
            </Link>
            <Link to="/profile">
              <img
                src="/src/images/user_attributes_24dp_1F1F1F_FILL1_wght500_GRAD0_opsz48.svg"
                alt="Profile"
                title="Profile"
                className="h-8"
              />
            </Link>
          </div>
        </header>
        <div>
          <h1 className="p-10 bg-[#f1f8e9] text-center text-3xl font-extrabold text-green-600 ">
            Get in Touch for Questions, Quality commodities, and Collaborations
          </h1>
        </div>
      </div>
      <div className="bg-[#f1f8e9] p-12">
        <h2 className="text-xl font-semibold mb-4">Developers Contact</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src="https://www.syngenta.co.ke/sites/g/files/kgtney986/files/styles/syngenta_large_4_3/public/media/image/2023/05/16/mkulima-digital.jpg?itok=S1hjLwlk"
              alt="mkulima"
              className="w-full h-auto rounded-xl shadow-md"
            />
          </div>

          <div className="p-5 bg-blue-100 rounded-xl shadow-sm">
            <h2 className="mb-4 text-green-600 font-bold text-3xl">
              Get in touch via email:
            </h2>
            <p className="text-blue-400 font-semibold text-xl space-y-2">
              <span>
                Godwin:{" "}
                <a
                  href="mailto:gdthuranira@gmail.com"
                  className="underline hover:text-green-800"
                >
                  gdthuranira@gmail.com
                </a>
              </span>
              <br />
              <span>
                Jeff:{" "}
                <a
                  href="mailto:jeffmbithi9@gmail.com"
                  className="underline hover:text-green-800"
                >
                  jeffmbithi9@gmail.com
                </a>
              </span>
              <br />
              <span>
                Vincent:{" "}
                <a
                  href="mailto:vincetmachariakimani@gmail.com"
                  className="underline hover:text-green-800"
                >
                  vincetmachariakimani@gmail.com
                </a>
              </span>
              <br />
              <span>
                Edna:{" "}
                <a
                  href="mailto:edna.wayua@student.moringaschool.com"
                  className="underline hover:text-green-800"
                >
                  edna.wayua@student.moringaschool.com
                </a>
              </span>
              <br />
              <span>
                Edian:{" "}
                <a
                  href="mailto:edian.nyambura@student.moringaschool.com"
                  className="underline hover:text-green-800"
                >
                  edian.nyambura@student.moringaschool.com
                </a>
              </span>
              <br />
              <div className="bg-green-50 border border-green-300 rounded-xl p-2 my-2 shadow-md text-center max-w-3xl mx-auto">
                <p className="text-green-900 text-lg leading-relaxed font-medium">
                  We truly appreciate you choosing our platform. Your support
                  means the world to us. We’re here to ensure you enjoy a
                  seamless and satisfying shopping experience
                </p>
              </div>
            </p>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Our GitHub Profiles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {/* Godwin */}
            <div className="bg-white shadow-lg rounded-lg p-4 text-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/250px-GitHub_Invertocat_Logo.svg.png"
                alt="Godwin"
                className="w-24 h-24 mx-auto rounded-full object-cover mb-3 shadow-sm border-2 border-green-500"
              />
              <h3 className="font-semibold text-lg">Godwin</h3>
              <a
                href="https://github.com/Goddy-10"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-green-700"
              >
                Goddy-10
              </a>
            </div>

            {/* Jeff*/}
            <div className="bg-white shadow-lg rounded-lg p-4 text-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/250px-GitHub_Invertocat_Logo.svg.png"
                alt="Jeff"
                className="w-24 h-24 mx-auto rounded-full object-cover mb-3 shadow-sm border-2 border-green-500"
              />
              <h3 className="font-semibold text-lg">Jeff</h3>
              <a
                href="https://github.com/Jeff-m9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-green-700"
              >
                Jeff-m9
              </a>
            </div>

            {/* Me */}
            <div className="bg-white shadow-lg rounded-lg p-4 text-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRptwq2cg7iPCzde7--zuCVK7rebi_eiG8eYQ&s"
                alt="Vincent"
                className="w-24 h-24 mx-auto rounded-full object-cover mb-3 shadow-sm border-2 border-green-500"
              />
              <h3 className="font-semibold text-lg">Vincent</h3>
              <a
                href="https://github.com/vinnohKimani"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-green-700"
              >
                VinnohKimani
              </a>
            </div>
            {/* Edna */}
            <div className="bg-white shadow-lg rounded-lg p-4 text-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/250px-GitHub_Invertocat_Logo.svg.png"
                alt="Jeff"
                className="w-24 h-24 mx-auto rounded-full object-cover mb-3 shadow-sm border-2 border-green-500"
              />
              <h3 className="font-semibold text-lg">Edna</h3>
              <a
                href="https://github.com/glitch-glitz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-green-700"
              >
                Glitch-glitz
              </a>
            </div>
            {/* Edian */}
            <div className="bg-white shadow-lg rounded-lg p-4 text-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/250px-GitHub_Invertocat_Logo.svg.png"
                alt="Jeff"
                className="w-24 h-24 mx-auto rounded-full object-cover mb-3 shadow-sm border-2 border-green-500"
              />
              <h3 className="font-semibold text-lg">Edian</h3>
              <a
                href="https://github.com/crisperi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-green-700"
              >
                Crisperi
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* Footer */}
        <footer className="bg-green-700 text-white py-6 text-center">
          <div className="space-x-4">
            <Link to="/about" className="hover:underline">
              About Us
            </Link>
          </div>
          &copy; 2025 FarMart App. All rights reserved.
        </footer>
      </div>
    </div>
  );
};
