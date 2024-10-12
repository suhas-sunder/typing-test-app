import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import GamepadTwoToneIcon from "@mui/icons-material/GamepadTwoTone";
import MenuRoundedIcon from "@mui/icons-material/MenuTwoTone";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenTwoTone";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import SchoolTwoToneIcon from "@mui/icons-material/SchoolTwoTone";
import SettingsSuggestTwoToneIcon from "@mui/icons-material/SettingsSuggestTwoTone";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import CelebrationTwoToneIcon from "@mui/icons-material/CelebrationTwoTone";
import StarTwoToneIcon from "@mui/icons-material/StarTwoTone";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import SportsMmaTwoToneIcon from "@mui/icons-material/SportsMmaTwoTone";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import LightModeTwoToneIcon from "@mui/icons-material/LightModeTwoTone";
import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone";
import KeyboardTwoToneIcon from "@mui/icons-material/KeyboardTwoTone";
import ArticleTwoToneIcon from "@mui/icons-material/ArticleTwoTone";
import MoreVertIcon from "@mui/icons-material/MoreVertTwoTone";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartmentTwoTone";
import PermIdentityTwoToneIcon from "@mui/icons-material/PermIdentityTwoTone";
import ManageAccountsTwoToneIcon from "@mui/icons-material/ManageAccountsTwoTone";
import WallpaperTwoToneIcon from "@mui/icons-material/WallpaperTwoTone";
import MilitaryTechTwoToneIcon from "@mui/icons-material/MilitaryTechTwoTone";
import InsightsTwoToneIcon from "@mui/icons-material/InsightsTwoTone";
import AutoAwesomeTwoToneIcon from "@mui/icons-material/AutoAwesomeTwoTone";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesomeTwoTone";
import PlaylistAddCheckCircleTwoToneIcon from "@mui/icons-material/PlaylistAddCheckCircleTwoTone";
import HistoryEduTwoToneIcon from "@mui/icons-material/HistoryEduTwoTone";
import AccessAlarmTwoToneIcon from "@mui/icons-material/AccessAlarmTwoTone";
import SwitchAccessShortcutIcon from "@mui/icons-material/SwitchAccessShortcutTwoTone";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIosTwoTone";
import HorizontalRuleTwoToneIcon from "@mui/icons-material/HorizontalRuleTwoTone";
import VerifiedIcon from "@mui/icons-material/VerifiedTwoTone";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunchTwoTone";
import FavoriteIcon from "@mui/icons-material/FavoriteTwoTone";
import HeartBrokenIcon from "@mui/icons-material/HeartBrokenTwoTone";
import SaveIcon from "@mui/icons-material/SaveTwoTone";
import QuestionIcon from "@mui/icons-material/LiveHelpTwoTone";
import DoubleArrowDown from "@mui/icons-material/KeyboardDoubleArrowDownTwoTone";
import DoubleArrowUp from "@mui/icons-material/KeyboardDoubleArrowUpTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";
import FaceRetouchingNaturalTwoToneIcon from "@mui/icons-material/FaceRetouchingNaturalTwoTone";
import FormatQuoteTwoToneIcon from "@mui/icons-material/FormatQuoteTwoTone";
import PetsTwoToneIcon from "@mui/icons-material/PetsTwoTone";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import BiotechTwoToneIcon from "@mui/icons-material/BiotechTwoTone";
import EmojiNatureTwoToneIcon from "@mui/icons-material/EmojiNatureTwoTone";
import TerrainIcon from "@mui/icons-material/TerrainTwoTone";
import CalculateTwoToneIcon from "@mui/icons-material/CalculateTwoTone";
import GavelTwoToneIcon from "@mui/icons-material/GavelTwoTone";
import BusinessCenterTwoToneIcon from "@mui/icons-material/BusinessCenterTwoTone";
import SpeedIcon from "@mui/icons-material/SpeedTwoTone";
import WorkspacePremiumTwoToneIcon from "@mui/icons-material/WorkspacePremiumTwoTone";
import SortByAlphaTwoToneIcon from "@mui/icons-material/SortByAlphaTwoTone";
import PestControlRodentTwoToneIcon from "@mui/icons-material/PestControlRodentTwoTone";
import FlutterDashTwoToneIcon from "@mui/icons-material/FlutterDashTwoTone";
import GrassTwoToneIcon from "@mui/icons-material/GrassTwoTone";
import LocalFloristTwoToneIcon from "@mui/icons-material/LocalFloristTwoTone";
import SailingTwoToneIcon from "@mui/icons-material/SailingTwoTone";
import MovieFilterTwoToneIcon from "@mui/icons-material/MovieFilterTwoTone";
import CakeTwoToneIcon from "@mui/icons-material/CakeTwoTone";
import StarHalfIcon from "@mui/icons-material/StarHalfTwoTone";

interface PropType {
  title: string;
  customStyle: string;
  icon: string;
}

export default function Icon({ title, customStyle, icon }: PropType) {
  const handleIcon = () => {
    switch (icon) {
      case "eye":
        return <VisibilityTwoToneIcon />;
      case "mastery":
        return <WorkspacePremiumTwoToneIcon />;
      case "speed":
        return <SpeedIcon />;
      case "suitcase":
        return <BusinessCenterTwoToneIcon />;
      case "law":
        return <GavelTwoToneIcon />;
      case "math":
        return <CalculateTwoToneIcon />;
      case "bee":
        return <EmojiNatureTwoToneIcon />;
      case "mountain":
        return <TerrainIcon />;
      case "microscope":
        return <BiotechTwoToneIcon />;
      case "book":
        return <MenuBookTwoToneIcon />;
      case "paw":
        return <PetsTwoToneIcon />;
      case "quote":
        return <FormatQuoteTwoToneIcon />;
      case "eyeCrossed":
        return <VisibilityOffTwoToneIcon />;
      case "doubleArrowDown":
        return <DoubleArrowDown />;
      case "doubleArrowUp":
        return <DoubleArrowUp />;
      case "heart":
        return <FavoriteIcon />;
      case "questionMark":
        return <QuestionIcon />;
      case "save":
        return <SaveIcon />;
      case "brokenHeart":
        return <HeartBrokenIcon />;
      case "lockOpen":
        return <LockOpenTwoToneIcon />;
      case "lockClosed":
        return <LockTwoToneIcon />;
      case "graduationHat":
        return <SchoolTwoToneIcon />;
      case "gamepad":
        return <GamepadTwoToneIcon />;
      case "burgerOpen":
        return <MenuRoundedIcon />;
      case "burgerClosed":
        return <MenuOpenRoundedIcon />;
      case "trophy":
        return <EmojiEventsTwoToneIcon />;
      case "settingsSparkle":
        return <SettingsSuggestTwoToneIcon />;
      case "confetti":
        return <CelebrationTwoToneIcon />;
      case "starFull":
        return <StarTwoToneIcon />;
      case "starHalf":
        return <StarHalfIcon />;
      case "starEmpty":
        return <GradeOutlinedIcon />;
      case "plus":
        return <AddTwoToneIcon />;
      case "boxingGlove":
        return <SportsMmaTwoToneIcon />;
      case "chevron":
        return <ExpandMoreTwoToneIcon />;
      case "lightMode":
        return <LightModeTwoToneIcon />;
      case "darkMode":
        return <DarkModeTwoToneIcon />;
      case "keyboard":
        return <KeyboardTwoToneIcon />;
      case "article":
        return <ArticleTwoToneIcon />;
      case "threeDotsVertical":
        return <MoreVertIcon />;
      case "closeBtn":
        return <HighlightOffTwoToneIcon />;
      case "info":
        return <InfoTwoToneIcon />;
      case "flame":
        return <LocalFireDepartmentIcon />;
      case "profile":
        return <PermIdentityTwoToneIcon />;
      case "profileSettings":
        return <ManageAccountsTwoToneIcon />;
      case "profileImage":
        return <WallpaperTwoToneIcon />;
      case "achievements":
        return <MilitaryTechTwoToneIcon />;
      case "stats":
        return <InsightsTwoToneIcon />;
      case "sparkle":
        return <AutoAwesomeTwoToneIcon />;
      case "sparkleFill":
        return <AutoAwesomeIcon />;
      case "circleCheckmark":
        return <PlaylistAddCheckCircleTwoToneIcon />;
      case "paperQuill":
        return <HistoryEduTwoToneIcon />;
      case "clock":
        return <AccessAlarmTwoToneIcon />;
      case "upgrade":
        return <SwitchAccessShortcutIcon />;
      case "leftArrow":
        return <ArrowBackIosIcon />;
      case "horizontalLine":
        return <HorizontalRuleTwoToneIcon />;
      case "certificate":
        return <VerifiedIcon />;
      case "rocket":
        return <RocketLaunchIcon />;
      case "face":
        return <FaceRetouchingNaturalTwoToneIcon />;
      case "azLetters":
        return <SortByAlphaTwoToneIcon />;
      case "mouse":
        return <PestControlRodentTwoToneIcon />;
      case "bird":
        return <FlutterDashTwoToneIcon />;
      case "grass":
        return <GrassTwoToneIcon />;
      case "flower":
        return <LocalFloristTwoToneIcon />;
      case "sailing":
        return <SailingTwoToneIcon />;
      case "movie":
        return <MovieFilterTwoToneIcon />;
      case "cake":
        return <CakeTwoToneIcon />;
      default:
        return <GradeOutlinedIcon />;
    }
  };

  return (
    <i title={title || "default-star-icon"} className={`flex ${customStyle}`}>
      {handleIcon()}
    </i>
  );
}
