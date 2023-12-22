import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Menu from "../components/Menu";
import Preloader from "../components/Preloader";
import Header from "../components/Header";
import { collection, query, orderBy } from "firebase/firestore";
import { firestore } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDispatch } from "react-redux";
import { setStudentProfiles } from "../redux/profileSlice";

const Protected = () => {
  const { user, userLoading } = useAuth();
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);

  const profileDocRef = collection(firestore, "profiles");
  const profileDocQuery = query(profileDocRef, orderBy("createdAt", "desc"));
  const [profiles, isFetchingProfiles, profileFetchErr] =
    useCollectionData(profileDocQuery);

  useEffect(() => {
    try {
      if (profiles) {
        const stringifiedProfiles = JSON.stringify(profiles);
        if (stringifiedProfiles) {
          const parsedProfiles = JSON.parse(stringifiedProfiles);
          dispatch(setStudentProfiles(parsedProfiles));
        }
      }
    } catch (error) {
      console.log(profileFetchErr);
    }
  }, [profiles]);

  useEffect(() => {
    if (window.innerWidth > 640) {
      setShowMenu(true);
    }
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (userLoading || isFetchingProfiles) return <Preloader />;

  return user ? (
    <div className="relative">
      <Header onMenuClick={() => setShowMenu(!showMenu)} />
      <div className="relative m-auto flex min-h-screen max-w-7xl gap-2 p-2 max-sm:pt-14">
        <Menu
          showMenu={showMenu}
          onMenuClick={() => {
            if (window.innerWidth < 640) {
              setShowMenu(!showMenu);
            }
          }}
        />
        <div className="relative h-fit flex-1 rounded-md bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="login" />
  );
};

export default Protected;
