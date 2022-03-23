import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { profileState } from "../../../../../recoil/profile";

export const ModifyModalNickname = () => {
  // recoil
  const [profileStateVal, setProfileStateVal] = useRecoilState(profileState);

  // useState
  const [nickname, setNickname] = useState("");

  // input on method
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setNickname(value);
  };

  // click button
  const clickModifyNicknameConfirm = () => {
    console.log("confirm nickname duplicate / " + nickname);
  };
  const clickModifyNicknameChange = () => {
    console.log("change nickname / " + nickname);
    localStorage.setItem("token", nickname);
    setProfileStateVal({
      ...profileStateVal,
      userNickname: nickname,
      modifyModalNickname: false,
    });
  };

  // useEffect
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) return;
    setNickname(token);
  }, []);

  return (
    <>
      <div>
        <input
          name="userNickname"
          value={nickname}
          onChange={onChange}
          placeholder="nickname"
        />
        <button onClick={clickModifyNicknameConfirm}>중복 확인</button>
      </div>
      <button onClick={clickModifyNicknameChange}>변경하기</button>
      <button
        onClick={() => {
          setProfileStateVal({
            ...profileStateVal,
            modifyModalNickname: false,
          });
        }}
      >
        아니요, 실수에요!
      </button>
    </>
  );
};
