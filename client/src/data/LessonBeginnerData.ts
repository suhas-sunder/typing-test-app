export type LessonDataType = {
  id: string;
  linkToNovelsWebsite?: string;
  title: string;
  lessonData: {
    sectionTitle: string;
    sectionId: string;
    sectionData: {
      id: string;
      levelTitle: string;
      text?: string;
    }[];
  }[];
};

function LessonBeginnerData() {
  const data: LessonDataType = {
    id: "beginner-id",
    title: "Beginner",
    lessonData: [
      {
        sectionTitle: "Home Row Left Hand",
        sectionId: "home-row-left-id",
        sectionData: [
          {
            id: "as",
            levelTitle: "as",
            text: "aaaa ssss a sas saa asas ssssa a a sa s asaas aaaa sssa ssss s as aa ssssa sss ss aas ssaa aasas aasa ss aasaa sass aaa sasa sss ss aas sa ss aaa sssss aasa ssss a saa sa",
          },
          {
            id: "ad",
            levelTitle: "ad",
            text: "aaaa dddd d da daad d aa adad ddaa a aaa aada ada add aad dddad adaa aaa aa da aaaa daad ada aadda aaaaa a ddaad aaa dadd ada daa a aaaaa ddad a a dda adda a ddd ad ad adddd da",
          },
          {
            id: "af",
            levelTitle: "af",
            text: "aaaa ffff faaf ffa a af aff afaff ffa aff aaffa fafff aff af faffa faa aaaf ffaa f ff ffaaf affaa faa fff aaa ff faff a aaff ffa a ffa aaf f aaaa afa aa ff aaff afafa ff aa aaa afaa aaa faa f aaa",
          },
          {
            id: "sd",
            levelTitle: "sd",
            text: "dddd ssss dd dsd ds ss sdds ss dssd sdsdd s s dssds d d sddds dsdss dsss dddss ds dd s ds s d dsdds ssdsd sd ss ssd sdds sddds dds ssss sddd d ddsds dds ss d sdd ds s sssds dsds sdd sdss",
          },
          {
            id: "fd",
            levelTitle: "fd",
            text: "ffff dddd fdf fddfd fd f d d fdd d ddff dfffd dfdff ff ddf dfd fffd dffd dd dd fdfff dff fdfff dddf f dd fddff d fddf df dd fff d dd ffd df d ddff d fdd ff ff f df dfddd fd",
          },
          {
            id: "asd",
            levelTitle: "asd",
            text: "aaaa ssss dddd sdasdd sd saad dsssaa dadsdd addss ssa ad sada d sss ds aasd dddds adssdddd dasda adda ssssasa dsdaa as adsdadd saa ddsdds d sssssaad sasds asddasda sssad a",
          },
          {
            id: "fds",
            levelTitle: "fds",
            text: "ssss dddd ffff dffd s sfdss fd s ds sfds d df ddffdfsd f ddd s fs fdddsf fffddss sdfdsdf dfdfff fsds ddd ffdsss ssssffs sfdfssss fsffds ddddsd sfs dddfs fffsdds sfdsfsdf",
          },
          {
            id: "asdf",
            levelTitle: "asdf",
            text: "aaaa ssss dddd ffff fadaasfs dssaddfffs adddsdfadd saaasf dfdsaf fsas sadfdsd fdffdad fff fsffafaffsd sfaad sf aa fdaf fda fd saafsdfaf daffasdf dddsasdsdf ssddd fafasda",
          },
          {
            id: "asdf-capital",
            levelTitle: "ASDF",
            text: "AAAA SSSS DDDD FFFF FADAASFS DSSADDFFFS ADDDSDFADD SAAASF DFDSAF FSAS SADFDSD FDFFDAD FFF FSFFAFAFFSD SFAAD SF AA FDAF FDA FD SAAFSDFAF DAFFASDF DDDSASDSDF SSDDD FAFASDA",
          },
          {
            id: "asdfasdf",
            levelTitle: "ASDFasdf",
            text: "aaaa AAAA ssss SSSS dddd DDDD ffff FFFF SFFSAas SFfFFDA SffDafFaDDaAaFA fdDAasFDAdfSSF saaaSaaFsSDaafdsaFDSsSA AadssFs DaSFFASFSADFfDAdafSF sdSsSSF FsFfASAsFaAAAdF FdffsafSSfSFSdDsAS FSSdAaAFafdf dDaDaFaFAdAfDdDFfA saAfA DS dADsSsDFdSfd fsFSDDafaas affFaFaFAs SddASaFaS fSfDFfFFssa SAsaDafDFFadsFfDsD AfFaFSddsdDSSAaaS FsFDSs ddAddDdd FsdDfSsa",
          },
        ],
      },
      {
        sectionTitle: "Home Row Right Hand",
        sectionId: "home-row-right-id",
        sectionData: [
          {
            id: "jk",
            levelTitle: "jk",
            text: "jjjj kkkk kk jjkkj k kjjjk jjk kjkjk k jjjkk kjjj jkjkj jkkkk kkkj jkjk kk j jjjj jjkj j jjkk jkkjj j kk jk kjkjk kkkjj k kkkjk j jk k kkjj j jj jkj kjj jjj j jjj kk",
          },
          {
            id: "jl",
            levelTitle: "jl",
            text: "jjjj llll lljll jjljl ljjj lj ll jjjlj jl jjjjj l l jlllj llll jljl jjj ljjj ljjj jjl ll j jlllj j ll jl lj j jjl jljlj jjll lj j jllj ll jlj lll ll l lljll ljj j ljjlj",
          },
          {
            id: "j;",
            levelTitle: "j;",
            text: "jjjj ;;;; j;;; ;j;; j ;;;j ;;;;; ;;j ;;;j ;j; ;jj; j;;;; ; ;;;; j j;j j ;;;; ;jjj ;jj j; j;jj ; jjj;j j ;j;j; j;;;j j ;jjj; j ;jj j jj;;j ;jjjj j;;;; ;j ;j ;;; ;;j j; jjj;",
          },
          {
            id: "kl",
            levelTitle: "kl",
            text: "kkkk llll lllkl kkll klkll lllk klkkk kkl kllll kkkl kl k lklkl kk l l lkk lllll kkkk llkl lkkkk llkl kkk lll lk l kll lk lk l l kl lllkl klkkk ll l k lk llkl klk klkl",
          },
          {
            id: ";k",
            levelTitle: ";k",
            text: "kkkk ;;;; ; kk;; ;kk k ; k; k;;k; k ;;k k;; k;; k; ;kk;; k;;k ;kk ;kk kk k ;; ;;kk ; ;k ;k; kk k k;;;; kk ;; k ;; kk;;; k;; ;;k k;; k;; k; ;kk;; k;;k ;kk ;kk kk k ;; ;;kk ;",
          },
          {
            id: "jkl",
            levelTitle: "jkl",
            text: "jjjj kkkk llll kklkl kjj j jjl kjkjk lljkklj kjkkkk ljkjllll lj kllkj jll ll k jj lklllljl j lkl lll jljk lllkjkl j jlkl kk kk lljj jjjkjjjk lll jljk lllkjkl j jlkl kk kk lljj",
          },
          {
            id: ";lk",
            levelTitle: ";lk",
            text: "llll kkkk ;;;; ll;; ;;ll kl; ;l;ll; ;;kllll llkl;k lkk;k klkl ll;lkl; ;; klk ;;kl;;l ;lll l lk;l; ;;kk; ;;kll; kl ;kl;k l;k l; lk;l;;ll lklk;;kk ;kl ;;;;;;lk ;k l;l;l ll k kl;k",
          },
          {
            id: "jkl:",
            levelTitle: "JKL:",
            text: "JJJJ KKKK LLLL :::: :K:LK JKJLL:K LL::LLL:K : :::KLJ:JL :K:LK:JJJL: K:: :LLLLLKK:J J: KL:LKLK:::J : LJK:L LJKKL::LKL: :: L:JKKL ::JLKLK: L KJLJJ:KKKL: L:KKL:LLKLK K::LJJL:K LLJ LJL",
          },
          {
            id: "jkl:jkl;",
            levelTitle: "JKL:jkl;",
            text: "jjjj JJJJ kkkk KKKK llll LLLL ;;;; :::: lKK lKjkL;kJjkljjLL:Kljl jJ;LJLKJL:jj;JJ lklL :lL;LLkjk lLlLLJkllkjj: Lk:kJL;kLK l KKlLkJK;KkL;:LJJL;ljj; l:Kk l;;:k:KL:K:ljL:kK :K L;:lkLKk",
          },
        ],
      },
      {
        sectionTitle: "Home Row",
        sectionId: "home-row-id",
        sectionData: [
          {
            id: "asjk",
            levelTitle: "asjk",
            text: "aaaa ssss jjjj kkkk asjsa sj kjjsa jsj sskksaasaj sjksjks kksjsaakska kjjsjaa sjakkaaskks jjkjaasjs jskssskkjk kkkja s ssjkkajajs aaskjakks aksjsasaj asajajsjk kasaaka s kjj ksskajkas",
          },
          {
            id: "adjl",
            levelTitle: "adjl",
            text: "aaaa dddd jjjj llll aldadaddja ddaj jad jlldddd ddlladjjjj dl lddda lldljdddall lldjadjjdll ajddajadjaa ddllllaaj ljladdj ddd ajaddjjjjlj addlljljj d d jdaljjadaal allal ddla lajddlldjl",
          },
          {
            id: "afj;",
            levelTitle: "afj;",
            text: "aaaa ffff jjjj ;;;; jfaaf ;;jj j;ffffaj a;ajaa ;jjj;ja;f;; jfj a af;fffaffa aa faaj; fa ;;jf;ffaf ja;faa;;; ;jf a;jf;jj fa faafa;aaf; j;;aa ;jjafj;aj aajj;;j;j jjja; fa;a;aj aff;",
          },
          {
            id: "sdkl",
            levelTitle: "sdkl",
            text: "ssss dddd kkkk llll kdldkklkksk kkdkskdl dsldkklklds kksldldk l dsll ssdddd sss llld sklskdsd dd kd ddds kkdlkldd kd ds dlklkkkllkd slksk lslsllkl slddsskd llskskkdd lklkkkllldd",
          },
          {
            id: "fs;k",
            levelTitle: "fs;k",
            text: "ffff ssss ;;;; kkkk fk; ;kkss;s ;;kf;kks fkkskf;;fk ;;s skf sf sf;kk fsk ksf fsksfff;;fk ksks;kksks sfs;k; ;; fsf;ksfss k;;;kfs ;f fsksfkf s;;fffkssk fkkf;;ff;fk fss;ff; sss;fs;;k",
          },
          {
            id: "asdjkl",
            levelTitle: "asdjkl",
            text: "aaaa ssss dddd jjjj kkkk llll skladjl a alllkkkdsjdsjkjj ddsslsjddjsa djda kjjljjdkkslajjla dsadsdkjljalk lsadlj aasdkdklss sjslkajlsl lkjls sdkalkdsjjddaj dakjsajaakajdjska a jdk",
          },
          {
            id: "fds;lk",
            levelTitle: "fds;lk",
            text: "ffff dddd ssss ;;;; llll kkkk djllaad s adajlskkaljjlaaa asdadad ldjjkskkllsasja dkkl ka kdajddajljsads jklklasls alajssjdjkladkdll saasaaksa jadlaksdjdjslkld lsslssda kjd jsddkkjd",
          },
          {
            id: "asdfjkl:",
            levelTitle: "ASDFJKL:",
            text: "AAAA SSSS DDDD FFFF JJJJ KKKK LLLL :::: KSS :SJSLSFDFDJ: KD:DF:AFFDSFLFSDAD:: D:AJK::DJALSDSS:FSFS:AJ DDFDLL:DLF:AD DDF:KSLS:FDJJKS KSJKL KFAKDFAFAKKLJJ SSAA:JDF DFS:SAL:F LKSFA DFLL",
          },
          {
            id: "asdfasdfjkl:jkl;",
            levelTitle: "ASDFasdfJKL:jkl;",
            text: "aaaa AAAA ssss SSSS dddd DDDD ffff FFFF jjjj JJJJ kkkk KKKK llll LLLL ;;;; :::: DSfLdk: Da;d;SkjAAfDAajLkFLFJlKAlaKJDlj af;lJFsLlfJLadjlkDKJ:LLsJl;AAfsLsFDFS;:KSlDjj ;S:DjLaAFJfSdD:",
          },
        ],
      },
      {
        sectionTitle: "Top Row Left Hand",
        sectionId: "top-row-left-id",
        sectionData: [
          {
            id: "qw",
            levelTitle: "qw",
            text: "qqqq wwww qqqqw qww wq www wqwq w wqwq qwqwq qww qq qw qwq q wqqq qwq wwqqq wwqqw q w qqwq qq wqw qwqq qwwq ww q qqq qw www qww q q wqwq qwqwq qww qq qw qwq q wqqq qwq wwqqq wwqqw",
          },
          {
            id: "qe",
            levelTitle: "qe",
            text: "qqqq eeee ee eqe e qe eeeqe eqeqe qqqee qq eeqee eeq qq qq eqeq qq eeeeq qq q ee q eqeee qeq qeeq e qeq q eeeq qqe eeqe eeeq e eeqq eeee eeeeq qeeqe qe eqq eeeeq qeq qee qqe eeqe q",
          },
          {
            id: "qr",
            levelTitle: "qr",
            text: "qqqq rrrr qr rq rrqq rrqrr rqr qrr qr rr rqq rrqrq rrq rr rq rq qrrqq rqrr qqrrq qqqr q qrrr rqq r qqqqq qqrqr qqr qrqqq qrqqq rrqrq r rqqrr qrrqq rqq qqq qqq rrr qqqr qrr rrrr rrr",
          },
          {
            id: "qt",
            levelTitle: "qt",
            text: "qqqq tttt qqtqt qqqq ttq qtt ttq qqqq ttt qt qtqt q t qtq tt qtttq qqq qqqqt qt tqqqq qtq qtq qttq qtqq qtq q ttqtt qt tqq ttqt qq tqtq qttqt qq t tq qqtq qtt qtqt qtq tqqqt qttqt qq",
          },
          {
            id: "wer",
            levelTitle: "wer",
            text: "wwww eeee rrrr rr rrrewr rwwrerrw e wrwe wrerrr we r www weerwee wweewwwe wew wwereeew rrrewrwr eewrw wrreew wereww wrrr wrw wweree ww rwrerww rwwrr rreeee wewrr ererww wwrrree weew",
          },
          {
            id: "qwe",
            levelTitle: "qwe",
            text: "qqqq wwww eeee qewe qqw qqqwq wqeqqqww qeweqeqq wewqeew we wwewqqww weeee wqwqee qqeqwe eeew wwwqq wqwe qwqqq wwqqq w ewq wqqq eeeqwq wwe eqeqewqe eewwee eqe weeeqe wqeqwe qe e qewqee",
          },
          {
            id: "ert",
            levelTitle: "ert",
            text: "eeee rrrr tttt re ter tte rttrerer et ttt trtt tte e rtreert trrre ee ettr reteee etre t etrteeet tttr teeeet ett etrrere terrreee teeeee rrtrette terertee ree r eetr rrete ert re erre",
          },
          {
            id: "qwert",
            levelTitle: "qwert",
            text: "qqqq wwww eeee rrrr tttt rt ertrtet trteeett rrtr trteteer trte ereet eeerer ttrteee re ttt t ertr teerr rrer rree rer eereeet rreteere rret retrrtre etr tee errttrr ttrtett teeere ee",
          },
          {
            id: "qwert-capital",
            levelTitle: "QWERT",
            text: "QQQQ WWWW EEEE RRRR TTTT WERRTR QWTTERTEQQQET RQQEQWQ E RW WQTWR WRQ RTETRW QRTRQEQEEQTQE ETWWRQQRTWER QWTWREWT QWWTEREWQEW WEWTQRQQTTWT WWRRTEEWTRQRQR WQERWWE ERQQRE WRQEERWE WWQ RQTT",
          },
        ],
      },
      {
        sectionTitle: "Top Row Right Hand",
        sectionId: "top-row-right-id",
        sectionData: [
          {
            id: "yu",
            levelTitle: "yu",
            text: "yyyy uuuu uuyu yyuu uyuu yyyuu u uu uyyyy u uyu yyy yy uu yu uy uy yuyyy u yuy yu yuuy u uuyu yyyyu u uyyy uuy u yuuyu yyyy u yyuu uu yuyy uuyu uy yuuyy uuyy uuy uuuy yyyyu uuyu uuu uyuu",
          },
          {
            id: "yi",
            levelTitle: "yi",
            text: "yyyy iiii yyi yyy iiyii iy yiiyy iiy iii ii iiy yyy y ii iiyy iyyi yyyii yyy i yyiiy iiyiy ii yy yi i yi yyiiy iyyiy i iyii iy iiyiy i i iiiyi yi iiy yiy yyyiy i yi iyy yyi iyiyy yyyiy i yi",
          },
          {
            id: "yo",
            levelTitle: "yo",
            text: "yyyy oooo yoyoo oy o oo o oyo oooy yyoyo ooo o yyy yy o ooo oo oyoyo oooo yy yo y oo oo y yy ooyy yoo yyo yy oy oyyoy oyo y y yo y oyo yooyo oyo oy ooooy oy ooyo oy yyyyo oy ooo ooooy oy",
          },
          {
            id: "yp",
            levelTitle: "yp",
            text: "yyyy pppp ppyyp pypy yyypp yyppp pppy pp y ppp yppp p pypy yyppy pyp ypy pypy py pypyy yp yp ppyy p ypppp yyyy ppypy pp pypy yyy pppyy ppypy yyp ppyyy y pyppy y pp pyyp pp pyyp py yyppy pp",
          },
          {
            id: "uio",
            levelTitle: "uio",
            text: "uuuu iiii oooo ouoiioi iioiiioi uiioo ououuo o uouiioui o ioi ooo uouoioio ouuoui uiiuiii iooi i u uiu uiio ioo uouuu uiuuui ouoioiui ooiiui uoo u iouooi ooiouuui iuoioiui i ioioiuu i iui",
          },
          {
            id: "yui",
            levelTitle: "yui",
            text: "yyyy uuuu iiii yuii yiu uuu yiiyyuii iyii yy yuuiiuu i yy yiiyiiyu i uyyuiyi yyuuyy iiii yuuuyiu uyuyiy uyuyuuu u yyyyu y iiyy ui uui uy iiuiiui uuiyiiu yiii iu uiiyyiyu iu uuyiy yyiyi iyi",
          },
          {
            id: "iop",
            levelTitle: "iop",
            text: "iiii oooo pppp oppipii ooip io poppo i oiooppi oopoi i iopoo piioii ioppioop iiippio ppopo iippiop oippo pppiiop i iopoi ioo ipo iooppi ppppi o iippo i ioo ipopiio iooiippp oi pooooi pipp ooo",
          },
          {
            id: "yuiop",
            levelTitle: "yuiop",
            text: "yyyy uuuu iiii oooo pppp puoyuiyyipy p pooyoupi u uyiiyoy pppioppi uouyiyoop uiupouuiiyuii piyooiipoi uyop ouoi iioyipopui ipypyuioyyiii uppopipyo iyioiuy ioyopyuuoypyo piiypypyyuoou yoipoyuiu",
          },
          {
            id: "yuiop-capital",
            levelTitle: "YUIOP",
            text: "YYYY UUUU IIII OOOO PPPP UOUUY IIUIPUP YUIYUOYYO OOYYY UIPYIPY UPI OYUOOUPP PIYIYOYU IUUOPPOYU OYYUU UPOUPYPPYOYUOP IYOIIIPYOYUOO IOYPOO PYYYYPU YY YIIUYYYYOYPYYU PIPY YUYUIUUUIY PIOIIPUI YPIOU",
          },
        ],
      },
      {
        sectionTitle: "Top Row",
        sectionId: "top-row-id",
        sectionData: [
          {
            id: "qwyu",
            levelTitle: "qwyu",
            text: "qqqq wwww yyyy uuuu uqqqyu qquw ywuqywqq wqwq yuqqq wuwyqquuyu quuquw wqwyywy wuqquuyyqqu ywuu uuw ywu yyyywq uwuw qwuwy qyywqq wuyuuwyywy yqqqw qyyq q yqyww uuyqqyuuuq qqy yywwqywqqw wqqwyqywyw",
          },
          {
            id: "qeyi",
            levelTitle: "qeyi",
            text: "qqqq eeee yyyy iiii qie y yqyqq eey y qe qqyyi yeqeyyqi eieq eyee ieiq yqqiiiyqqiy yqqqe eyyq eeyeqyiy yieyyqeei yeqiqeqeiyq q qiqqeqqieq yiqqiyi yeeeqiqe iqeeiy yqqqeiye yee qieqeiqeq qe iqi",
          },
          {
            id: "qryo",
            levelTitle: "qryo",
            text: "qqqq rrrr yyyy oooo ryqry yoyoorqo roroyqqoqqq rqooqooqrqo rorqqrqyq ror ryyryororoy yroyoyroroy qyyqrrooq qrro q oyr yqrryy royoory oqq oqyrroyrq qyqo rrryqyorqo royrro y qrorq r qqoroqr rqyqr",
          },
          {
            id: "qtyp",
            levelTitle: "qtyp",
            text: "qqqq tttt yyyy pppp ttytpp qyttttpy tyqtypq ytypy pqttpyqppt pqqtt typpp qtqtqqt qpyyp yptppy pqtpqq pty tpytyqttq qytpttypp y qpypyqt yqttytt qtttttttqtq pptqqqpp ytyqqptppp ytpptyty pttt pqpqq",
          },
          {
            id: "weruio",
            levelTitle: "weruio",
            text: "wwww eeee rrrr uuuu iiii oooo rieuueiieeirow iiwuwwieewu eu wwouoriwouuueiui oiwu wwiui wuwirwrewuwior iouwu rrweruuiiirrwiore iriwuoeeouiii reeuuewuwrow wiowuiwwiiru o uewiwue euiowoeurw e iirou",
          },
          {
            id: "qweyui",
            levelTitle: "qweyui",
            text: "qqqq wwww eeee yyyy uuuu iiii qwquiuyuqeqi iyywqueuiewi qywiqqyyuiequqy wwiqiuuiiuiew ee yiwyuweuqwyyiwwi qyieyiquqqeqyw iwwuyyqu eiqeqyewwiwy uwqiyiquuuywue equeyiueieqwieu yiu yiyu w yi iyyeiewe",
          },
          {
            id: "ertiop",
            levelTitle: "ertiop",
            text: "eeee rrrr tttt iiii oooo pppp ii rorprririi e tor por rtoopieepipie oiiiiooio rroeprrte ererteirttti oeorrep i riettttoi pitetpoerietoii otoerpirip irororitoi ttrrptipe ortr eppeor oioperroirpetept",
          },
          {
            id: "qwertyuiop",
            levelTitle: "qwertyuiop",
            text: "qqqq wwww eeee rrrr tttt yyyy uuuu iiii oooo pppp ioorroyuiwyytyquu ipurppeowyeotetouwuuopput ouqureoytruwqoti iwouioeepoqtrqywutrrruiqww ettiqtpiyprteeowyettiwwuqqpy wuyiyturwqreypywyoi yyiwyouyoi",
          },
          {
            id: "qwertyuiop-capital",
            levelTitle: "QWERTYUIOP",
            text: "QQQQ WWWW EEEE RRRR TTTT YYYY UUUU IIII OOOO PPPP TEOR EUOOIUORWEEEWPEPUYYQWY UYIIWU TIIPUWWTQP QPQPTRO RTERWIYPYYI QTYYQTWWWOTRORPWWQWPRTYEU YOTTRTUW I QI YWPUQQPOQOWTOYIUOTUOWWYUOIT WETWUQQYWWOET",
          },
          {
            id: "qwertqwertyuiopyuiop",
            levelTitle: "QWERTqwertYUIOPyuiop",
            text: "QQQQ qqqq WWWW wwww EEEE eeee RRRR rrrr TTTT tttt YYYY yyyy UUUU uuuu IIII iiii OOOO oooo PPPP pppp YYrrrPitQrQWy Ri RROeyQRqeoUYyRytYYoURuWRyeYPoWqpuPU OoQtwtwqWUyRrUEuyrYoyyRurWuEPyREPIrIqOurepwwe",
          },
        ],
      },
    ],
  };

  return data;
}

export default LessonBeginnerData;
