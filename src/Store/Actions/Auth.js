import * as actionTypes from "../ActionTypes/Auth";
import { signInWithPopup } from "firebase/auth";

export const signInWithGoogleData = (payload) => {
  return {
    type: actionTypes.STORE_SIGNIN_GOOGLE_DATA,
    payload,
  };
};

export const signInFailed = (payload) => {
  return {
    type: actionTypes.SIGNIN_FAILED,
    payload,
  };
};

export const signInWithGoogle = (auth, provider, history) => {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((res) => {
        const responseData = {
          photo:
            res._tokenResponse.photoURL ||
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH4AoAMBIgACEQEDEQH/xAAbAAEBAQEBAAMAAAAAAAAAAAAABgMFBAECB//EADgQAAEEAAIHBQUGBwAAAAAAAAABAgMEESEFEzFBUXGhBhVSVLEyYYGR8RIiNFNz0RQjM2KywfD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/agAAAAAAAADC3ahpwrLO7BNiJvVfcBufCqjfaXDmSt3TlqwqpCuoj4N9pfic1z3PVVe5zl4uXEC8RUd7KovJT5IJrnMXFjlaqbFauB0aWm7ddUSR2uj3tft+CgVgPPSuQ3YtZA7HxNXa3megAAAAAAAAAAAAAAAAD6yyNijdI9cGtRVVeCEXpG5JdsulfijdjG+FDvdpptXSZE3bK/Pkmf7EwAAAAIoAHoo25adhssWeHtN3OTgWkMrJ4mSxrix6YoQZS9mJ1fWlgXPVuxTkv0UDtAAAAAAAAAAAAAAAAnu1WP26vDB/wDo4JT9poNZTZKiYrE/Pkv/ACEwAAAAAADt9lcf4ixw+wnqcQpOy8CsrSzKi/zHIick+oHbAAAAAAAAAAAAAAAB9JY2zRPjkTFj0VFT3EXfpvpWHRPzTa13iQtzz3KkN2LVztx8KptbyAiAdK7oS3XVVjbro+LNvyOa5Fa5WuyVNqLtAAIiuXBua+46VLQ1uyqK5upj3uemfyA8tKo+5YbDHv2u8KcSzghZBCyKNMGsTBDKjShpQ6uFua+05drj0gAAAAAAAAAAAAAAAysWIa0ayTvRjU47+QGoJy52hkcqtqRoxPG/NfluOTNbsTrjNM9/uVcvkBZyWq0f9SxE3m9EMH6S0e7J9mF3UjcuAAsmaR0cmTLEDehuy3WlXCOxE9f7XopDYZAC/BDQ2rFfOGZ7eS5fLYdWn2hlaqJbjR6eNmSp8NigUgMq9iGzGkkD0e305moAAAAAAAAAAAYXbUdOu6aTNEyRE2qvAjrlua5MsszsV3NTY1OCHu7RWddd1LV+5Dl8V2nKAAAAAAAAAAYjEDenbmpTJLC7Bd6bnJwUsKNtl2u2aPLHJWrtReBEYnU7O2lgvJEq/cmTBee79gKsAAAAAAAAAARF9cb9lV/Nf6qYKptf/HWf1n/5KYAAAAAAAAAAAAN6K4Xq2H5rPVDA2o/jq36rPVALkAAAAAAAAAASVzRt19ud7az1a6VyovFMVMe6r/lX9CzAEZ3Vf8q/oO6r/lX9CzAEZ3Vf8q/oO6r/AJV/QswBGd1X/Kv6Duq/5V/QswBGd1X/ACr+g7qv+Vf0LMARndV/yr+hrU0ZdZbgc6s9GtkaqrwTErgAAAAAAf/Z",
          name: res._tokenResponse.fullName,
          email: res._tokenResponse.email,
          accessToken: res._tokenResponse.oauthAccessToken,
          expiresIn: res._tokenResponse.expiresIn,
          uid: res._tokenResponse.localId,
        };
        dispatch(signInWithGoogleData(responseData));
        history.push("/");
      })
      .catch((err) => {
        const errorMessage = "Please try again, login Failed!";
        console.log(err);
        dispatch(signInFailed(errorMessage));
        history.push("/");
      });
  };
};

export const storeUserData = (payload) => {
  return {
    type: actionTypes.STORE_USER_DATA,
    payload,
  };
};

export const menuData=(payload)=>{
  return{
    type:actionTypes.MENU_DATA,
    payload
  }
}
