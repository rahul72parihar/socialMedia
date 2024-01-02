import Navigation from "../Components/Navigation";
import { TbError404 } from "react-icons/tb";

const PageNotFound = () => {
  return (
    <>
      <Navigation />
      <div className="flex flex-1 justify-center items-center text-5xl font-bold dark:text-white gap-5">
        <div className="text-9xl">
          <TbError404></TbError404>
        </div>
        Page Not Found
      </div>
      ;
    </>
  );
};

export default PageNotFound;
