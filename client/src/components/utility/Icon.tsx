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
        return <GradeOutlinedIcon  />;
      case "plus":
        return <AddTwoToneIcon />;
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