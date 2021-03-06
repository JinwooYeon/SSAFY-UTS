import { useRecoilValue } from "recoil";
import { ThemeType } from "../../../../../global/theme";
import { artistDetailState } from "../../../../../recoil/artistDetail";
import LetterBox from "../../../../containers/letterBox/LetterBox";
import {
  InfoDetailBox,
  InfoDetailDescript,
  InfoMainbox,
  InfoMoreDetailBox,
  InfoMoreDetailBoxa,
} from "./ArtistInfoBox.styled";

interface IArtistInfoBox extends ThemeType {
  description: string;
  category: string;
  artistSns: string;
  artistFollowersTotal: string;
}

export const ArtistInfoBox = ({
  isDark,
  description,
  category,
  artistSns,
  artistFollowersTotal,
}: IArtistInfoBox) => {
  const CategoryList = [
    "",
    "π΅ Music",
    "π¨ Art",
    "β½ Sport",
    "ποΈ Actors",
    "π Fashion",
    "ποΈ Creator",
    "πΈ Other",
  ];

  return (
    <InfoMainbox isDark={isDark}>
      <InfoDetailDescript isDark={isDark}>
        <LetterBox>{description}</LetterBox>
      </InfoDetailDescript>
      <br></br>
      <InfoDetailBox>
        <InfoMoreDetailBox isDark={isDark}>
          {CategoryList[Number(category)]}
        </InfoMoreDetailBox>

        <InfoMoreDetailBoxa
          isDark={isDark}
          href={`https://${artistSns}`}
          target="_blank"
        >
          {artistSns.length > 20 ? artistSns.slice(0, 20) + "..." : artistSns}
        </InfoMoreDetailBoxa>
        <InfoMoreDetailBox isDark={isDark}>
          {artistFollowersTotal}λͺμ νλ‘μ
        </InfoMoreDetailBox>
      </InfoDetailBox>
      <br></br>
      <InfoDetailBox>
        <InfoMoreDetailBox isDark={isDark}>μ΄ λ§€μΆ</InfoMoreDetailBox>
        <InfoMoreDetailBox isDark={isDark}>μ΅κ³ κ°</InfoMoreDetailBox>
        <InfoMoreDetailBox isDark={isDark}>κ±°λλ</InfoMoreDetailBox>
      </InfoDetailBox>
    </InfoMainbox>
  );
};
