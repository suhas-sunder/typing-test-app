import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import GamepadTwoToneIcon from "@mui/icons-material/GamepadTwoTone";
import LiveHelpTwoToneIcon from "@mui/icons-material/LiveHelpTwoTone";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import SchoolTwoToneIcon from "@mui/icons-material/SchoolTwoTone";
import SettingsSuggestTwoToneIcon from "@mui/icons-material/SettingsSuggestTwoTone";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import CelebrationTwoToneIcon from "@mui/icons-material/CelebrationTwoTone";
import GradeTwoToneIcon from "@mui/icons-material/GradeTwoTone";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import SportsMmaTwoToneIcon from "@mui/icons-material/SportsMmaTwoTone";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import LightModeTwoToneIcon from "@mui/icons-material/LightModeTwoTone";
import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone";
import KeyboardTwoToneIcon from "@mui/icons-material/KeyboardTwoTone";
import ArticleTwoToneIcon from "@mui/icons-material/ArticleTwoTone";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import PermIdentityTwoToneIcon from "@mui/icons-material/PermIdentityTwoTone";
import ManageAccountsTwoToneIcon from "@mui/icons-material/ManageAccountsTwoTone";
import WallpaperTwoToneIcon from "@mui/icons-material/WallpaperTwoTone";
import MilitaryTechTwoToneIcon from "@mui/icons-material/MilitaryTechTwoTone";
import InsightsTwoToneIcon from "@mui/icons-material/InsightsTwoTone";
import AutoAwesomeTwoToneIcon from "@mui/icons-material/AutoAwesomeTwoTone";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import PlaylistAddCheckCircleTwoToneIcon from "@mui/icons-material/PlaylistAddCheckCircleTwoTone";
import HistoryEduTwoToneIcon from "@mui/icons-material/HistoryEduTwoTone";
import AccessAlarmTwoToneIcon from "@mui/icons-material/AccessAlarmTwoTone";

interface PropType {
  [key: string]: string;
}

function Icon({ title, customStyle, icon }: PropType) {
  const handleIcon = () => {
    switch (icon) {
      case "lockOpen":
        return <LockOpenTwoToneIcon />;
      case "lockClosed":
        return <LockTwoToneIcon />;
      case "graduationHat":
        return <SchoolTwoToneIcon />;
      case "gamepad":
        return <GamepadTwoToneIcon />;
      case "questionMark":
        return <LiveHelpTwoToneIcon />;
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
        return <GradeTwoToneIcon />;
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
      default:
        return <GradeOutlinedIcon />;
    }
  };

  return (
    <i title={title} className={customStyle}>
      {handleIcon()}
    </i>
  );
}

export default Icon;
