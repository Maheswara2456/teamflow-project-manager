import "../styles/profile/Profile.css";

import {
  useEffect,
  useState,
} from "react";

import {
  auth,
  db,
} from "../firebase/firebase";

import {
  updateProfile,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

function Profile() {

  const user =
    auth.currentUser;

  /* ======================================================
     STATES
  ====================================================== */

  const [loading, setLoading] =
    useState(true);

  const [editMode, setEditMode] =
    useState(false);

  const [profileData, setProfileData] =
    useState({

      name: "",
      email: "",
      phone: "",
      role: "Admin",
      bio: "",
      location: "",
      organization: "",
      expertise: "",
      photo:
        "https://i.pravatar.cc/300?img=12",

    });

  /* ======================================================
     LOAD PROFILE
  ====================================================== */

  useEffect(() => {

    const loadProfile =
      async () => {

        try {

          if (!user) return;

          const userRef =
            doc(
              db,
              "users",
              user.uid
            );

          const userSnap =
            await getDoc(userRef);

          if (
            userSnap.exists()
          ) {

            const data =
              userSnap.data();

            setProfileData({

              name:
                data.name || "",

              email:
                data.email ||
                user.email ||
                "",

              phone:
                data.phone || "",

              role:
                data.role ||
                "Admin",

              bio:
                data.bio || "",

              location:
                data.location || "",

              organization:
                data.organization || "",

              expertise:
                data.expertise || "",

              photo:
                data.photo ||
                user.photoURL ||
                "https://i.pravatar.cc/300?img=12",

            });

          } else {

            setProfileData(
              (prev) => ({

                ...prev,

                name:
                  user.displayName || "",

                email:
                  user.email || "",

                photo:
                  user.photoURL ||
                  prev.photo,

              })
            );
          }

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    loadProfile();

  }, [user]);

  /* ======================================================
     HANDLE INPUT
  ====================================================== */

  const handleChange =
    (e) => {

      const {
        name,
        value,
      } = e.target;

      setProfileData(
        (prev) => ({

          ...prev,

          [name]: value,

        })
      );
    };

  /* ======================================================
     SAVE PROFILE
  ====================================================== */

  const handleSave =
    async () => {

      try {

        await updateProfile(
          user,
          {
            displayName:
              profileData.name,

            photoURL:
              profileData.photo,
          }
        );

        await setDoc(

          doc(
            db,
            "users",
            user.uid
          ),

          {
            uid: user.uid,

            ...profileData,
          },

          {
            merge: true,
          }
        );

        alert(
          "Profile Updated Successfully"
        );

        setEditMode(false);

      } catch (error) {

        console.log(error);

      }
    };

  /* ======================================================
     LOADING
  ====================================================== */

  if (loading) {

    return (

      <div className="profile-loading">

        Loading Profile...

      </div>
    );
  }

  /* ======================================================
     UI
  ====================================================== */

  return (

    <div className="profile-page">

      <div className="profile-card">

        {/* ======================================================
            LEFT
        ====================================================== */}

        <div className="profile-left">

          <div className="profile-image-wrapper">

            <img
              src={profileData.photo}
              alt="profile"
              className="profile-image"
            />

          </div>

        
          <div className="profile-status">

            Active Account

          </div>

        </div>

        {/* ======================================================
            RIGHT
        ====================================================== */}

        <div className="profile-right">

          {/* HEADER */}

          <div className="profile-header">

            <div>

              <h1>
                Profile Settings
              </h1>

              <p>
                Manage your account information and personal details.
              </p>

            </div>

            <button
              className={
                editMode
                  ? "cancel-btn"
                  : "edit-btn"
              }
              onClick={() =>
                setEditMode(
                  !editMode
                )
              }
            >

              {
                editMode
                  ? "Cancel"
                  : "Edit Profile"
              }

            </button>

          </div>

          {/* FORM */}

          <div className="profile-form-grid">

            {/* FULL NAME */}

            <div className="profile-input-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={profileData.name}
                disabled={!editMode}
                onChange={handleChange}
              />

            </div>

            {/* EMAIL */}

            <div className="profile-input-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                value={profileData.email}
                disabled
              />

            </div>

            {/* PHONE */}

            <div className="profile-input-group">

              <label>
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={profileData.phone}
                disabled={!editMode}
                onChange={handleChange}
              />

            </div>

            {/* ROLE */}

            <div className="profile-input-group">

              <label>
                Role
              </label>

              <input
                type="text"
                name="role"
                value={profileData.role}
                disabled={!editMode}
                onChange={handleChange}
              />

            </div>

            {/* LOCATION */}

            <div className="profile-input-group">

              <label>
                Location
              </label>

              <input
                type="text"
                name="location"
                value={profileData.location}
                disabled={!editMode}
                onChange={handleChange}
              />

            </div>

            {/* ORGANIZATION */}

            <div className="profile-input-group">

              <label>
                Organization
              </label>

              <input
                type="text"
                name="organization"
                value={profileData.organization}
                disabled={!editMode}
                onChange={handleChange}
              />

            </div>

            {/* EXPERTISE */}

            <div className="profile-input-group full-width">

              <label>
                Profession / Expertise
              </label>

              <input
                type="text"
                name="expertise"
                value={profileData.expertise}
                disabled={!editMode}
                onChange={handleChange}
              />

            </div>

            {/* PHOTO */}

            <div className="profile-input-group full-width">

              <label>
                Profile Image URL
              </label>

              <input
                type="text"
                name="photo"
                value={profileData.photo}
                disabled={!editMode}
                onChange={handleChange}
              />

            </div>

            {/* BIO */}

            <div className="profile-input-group full-width">

              <label>
                Bio
              </label>

              <textarea
                name="bio"
                value={profileData.bio}
                disabled={!editMode}
                onChange={handleChange}
              ></textarea>

            </div>

          </div>

          {/* SAVE BUTTON */}

          {

            editMode && (

              <button
                className="save-profile-btn"
                onClick={handleSave}
              >

                Save Changes

              </button>
            )
          }

        </div>

      </div>

    </div>
  );
}

export default Profile;