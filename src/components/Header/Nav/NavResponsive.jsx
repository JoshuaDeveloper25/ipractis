import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

// Images
import profileSettingsIcon from "@/public/icons/profile-settings-icon.png";
import ipractisIcon from "@/public/icons/ipractis-icon.png";
import { ChevronRightDoorBoldIcon, SearchIcon } from "../../Icons";

const NavResponsive = () => {
  return (
    <div className="flex justify-between items-center gap-1.5">
      <div>
        <Link href="/">
          <Image
            className="w-8"
            alt="Logo iPractis"
            src={ipractisIcon}
            priority
          />
        </Link>
      </div>

      <Dropdown
        classNames={{
          content: "min-w-[300px] p-4",
        }}
        backdrop="blur"
      >
        <DropdownTrigger>
          <Image
            className="w-8 cursor-pointer"
            alt="Profile Settings Icon"
            src={profileSettingsIcon}
            priority
          />
        </DropdownTrigger>

        <div className="md:hidden">
          <DropdownMenu
            aria-label="Static Actions"
            variant="faded"
            classNames={{
              base: "p-0",
            }}
          >
            <DropdownItem className="disable-hover" key="logOut">
              <Link
                href="/login"
                className="btn btn-senary group w-full px-4 py-2 rounded-lg flex justify-center items-center"
              >
                <div className="flex-1">
                  <ChevronRightDoorBoldIcon
                    fillColor={"fill-primary-color-P12"}
                  />
                </div>

                <span className="sm:flex-[85%] flex-[80%]">Log out</span>
              </Link>
            </DropdownItem>

            <DropdownItem
              className="disable-hover mt-[5px] mb-[30px]"
              key="register"
            >
              <Link
                href="/register"
                className="btn btn-primary w-full px-4 py-2 rounded-lg"
              >
                Register
              </Link>
            </DropdownItem>

            <DropdownItem className="disable-hover" key="findTutor">
              <Link
                className="btn btn-senary group w-full px-4 py-2 rounded-lg flex justify-center items-center"
                href="#"
              >
                <span className="sm:flex-[85%] flex-[80%]">Find a Tutor</span>

                <div className="flex-1">
                  <SearchIcon fillColor={"fill-primary-color-P12"} />
                </div>
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </div>
      </Dropdown>
    </div>
  );
};

export default NavResponsive;
