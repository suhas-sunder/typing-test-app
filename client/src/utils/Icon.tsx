import loadable from "@loadable/component";
import { useEffect } from "react";

const LockOpenTwoToneIcon = loadable(
  () => import("@mui/icons-material/LockOpenTwoTone"),
);
const LockTwoToneIcon = loadable(
  () => import("@mui/icons-material/LockTwoTone"),
);
const GamepadTwoToneIcon = loadable(
  () => import("@mui/icons-material/GamepadTwoTone"),
);
const LiveHelpTwoToneIcon = loadable(
  () => import("@mui/icons-material/LiveHelpTwoTone"),
);
const MenuRoundedIcon = loadable(
  () => import("@mui/icons-material/MenuRounded"),
);
const MenuOpenRoundedIcon = loadable(
  () => import("@mui/icons-material/MenuOpenRounded"),
);
const EmojiEventsTwoToneIcon = loadable(
  () => import("@mui/icons-material/EmojiEventsTwoTone"),
);
const SchoolTwoToneIcon = loadable(
  () => import("@mui/icons-material/SchoolTwoTone"),
);
const SettingsSuggestTwoToneIcon = loadable(
  () => import("@mui/icons-material/SettingsSuggestTwoTone"),
);
const AddTwoToneIcon = loadable(() => import("@mui/icons-material/AddTwoTone"));
const CelebrationTwoToneIcon = loadable(
  () => import("@mui/icons-material/CelebrationTwoTone"),
);
const GradeTwoToneIcon = loadable(
  () => import("@mui/icons-material/GradeTwoTone"),
);
const GradeOutlinedIcon = loadable(
  () => import("@mui/icons-material/GradeOutlined"),
);
const SportsMmaTwoToneIcon = loadable(
  () => import("@mui/icons-material/SportsMmaTwoTone"),
);
const ExpandMoreTwoToneIcon = loadable(
  () => import("@mui/icons-material/ExpandMoreTwoTone"),
);
const LightModeTwoToneIcon = loadable(
  () => import("@mui/icons-material/LightModeTwoTone"),
);
const DarkModeTwoToneIcon = loadable(
  () => import("@mui/icons-material/DarkModeTwoTone"),
);
const KeyboardTwoToneIcon = loadable(
  () => import("@mui/icons-material/KeyboardTwoTone"),
);
const ArticleTwoToneIcon = loadable(
  () => import("@mui/icons-material/ArticleTwoTone"),
);
const MoreVertIcon = loadable(() => import("@mui/icons-material/MoreVert"));
const HighlightOffTwoToneIcon = loadable(
  () => import("@mui/icons-material/HighlightOffTwoTone"),
);
const InfoTwoToneIcon = loadable(
  () => import("@mui/icons-material/InfoTwoTone"),
);
const LocalFireDepartmentIcon = loadable(
  () => import("@mui/icons-material/LocalFireDepartment"),
);
const PermIdentityTwoToneIcon = loadable(
  () => import("@mui/icons-material/PermIdentityTwoTone"),
);
const ManageAccountsTwoToneIcon = loadable(
  () => import("@mui/icons-material/ManageAccountsTwoTone"),
);
const WallpaperTwoToneIcon = loadable(
  () => import("@mui/icons-material/WallpaperTwoTone"),
);
const MilitaryTechTwoToneIcon = loadable(
  () => import("@mui/icons-material/MilitaryTechTwoTone"),
);
const InsightsTwoToneIcon = loadable(
  () => import("@mui/icons-material/InsightsTwoTone"),
);
const AutoAwesomeTwoToneIcon = loadable(
  () => import("@mui/icons-material/AutoAwesomeTwoTone"),
);
const AutoAwesomeIcon = loadable(
  () => import("@mui/icons-material/AutoAwesome"),
);
const PlaylistAddCheckCircleTwoToneIcon = loadable(
  () => import("@mui/icons-material/PlaylistAddCheckCircleTwoTone"),
);
const HistoryEduTwoToneIcon = loadable(
  () => import("@mui/icons-material/HistoryEduTwoTone"),
);
const AccessAlarmTwoToneIcon = loadable(
  () => import("@mui/icons-material/AccessAlarmTwoTone"),
);
const SwitchAccessShortcutIcon = loadable(
  () => import("@mui/icons-material/SwitchAccessShortcut"),
);
const ArrowBackIosIcon = loadable(
  () => import("@mui/icons-material/ArrowBackIos"),
);
const HorizontalRuleTwoToneIcon = loadable(
  () => import("@mui/icons-material/HorizontalRuleTwoTone"),
);
const VerifiedIcon = loadable(() => import("@mui/icons-material/Verified"));

const RocketLaunchIcon = loadable(
  () => import("@mui/icons-material/RocketLaunch"),
);

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
      default:
        return <GradeOutlinedIcon />;
    }
  };

  useEffect(() => {
    const handlePreload = () => {
      LockOpenTwoToneIcon.preload();
      LockTwoToneIcon.preload();
      SchoolTwoToneIcon.preload();
      GamepadTwoToneIcon.preload();
      LiveHelpTwoToneIcon.preload();
      MenuRoundedIcon.preload();
      MenuOpenRoundedIcon.preload();
      EmojiEventsTwoToneIcon.preload();
      SettingsSuggestTwoToneIcon.preload();
      CelebrationTwoToneIcon.preload();
      GradeTwoToneIcon.preload();
      GradeOutlinedIcon.preload();
      AddTwoToneIcon.preload();
      SportsMmaTwoToneIcon.preload();
      ExpandMoreTwoToneIcon.preload();
      LightModeTwoToneIcon.preload();
      DarkModeTwoToneIcon.preload();
      KeyboardTwoToneIcon.preload();
      ArticleTwoToneIcon.preload();
      MoreVertIcon.preload();
      HighlightOffTwoToneIcon.preload();
      InfoTwoToneIcon.preload();
      LocalFireDepartmentIcon.preload();
      PermIdentityTwoToneIcon.preload();
      ManageAccountsTwoToneIcon.preload();
      WallpaperTwoToneIcon.preload();
      MilitaryTechTwoToneIcon.preload();
      InsightsTwoToneIcon.preload();
      AutoAwesomeTwoToneIcon.preload();
      AutoAwesomeIcon.preload();
      PlaylistAddCheckCircleTwoToneIcon.preload();
      HistoryEduTwoToneIcon.preload();
      AccessAlarmTwoToneIcon.preload();
      SwitchAccessShortcutIcon.preload();
      ArrowBackIosIcon.preload();
      HorizontalRuleTwoToneIcon.preload();
      VerifiedIcon.preload();
      RocketLaunchIcon.preload();
      VerifiedIcon.preload();
      RocketLaunchIcon.preload();
      GradeOutlinedIcon.preload();
    };

    const timer = setTimeout(handlePreload, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <i title={title} className={customStyle}>
      {handleIcon()}
    </i>
  );
}

export default Icon;
