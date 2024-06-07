export type LessonDataType = {
  id: string;
  icon: string;
  title: string;
  lessonData: {
    sectionTitle: string;
    sectionId: string;
    sectionData: { id: string; levelTitle: string; text?: string }[];
  }[];
}[];

export default function LessonData() {
  //Array of obects used to manage lessons page structure
  const pageData: LessonDataType = [
    {
      id: "beginner-id",
      icon: "face",
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
    },
    {
      id: "intermediate-id",
      icon: "face",
      title: "Intermediate",
      lessonData: [
        {
          sectionTitle: "Bottom Row Left Hand",
          sectionId: "bottom-row-left-id",
          sectionData: [
            {
              id: "zx",
              levelTitle: "zx",
              text: "zzzz xxxx zxxz xzzxz xxz z xzzz x zz xxxxx zxzxz xxx zx zzxzz xxxzx zzzxz x xzxxx xzxx xzz xz zx x zzxz zxxxx xzzzz xxzz xz xxzz z zx xzz xz x xx zxzx zz zxz x xzzx zzzx zz xxxx zxzzx xxxz xxx xx zxxzx",
            },
            {
              id: "zc",
              levelTitle: "zc",
              text: "zzzz cccc czc z cc ccc cc cczz czcc cc z zc czzz czcc cc zzzc czczz cz cczc zcz czcz c ccccz z zczzc cc ccczc czzc zcz ccccc zzz cz z cz cz cz zzcc czzcc cz z cczc zzc zczc ccc zzzzz c c czzzc czz zczcc",
            },
            {
              id: "zv",
              levelTitle: "zv",
              text: "zzzz vvvv vvzv zzz vv zz z zvzz vvz zvz v zzv zzz vzz vz vvz vvzz zzzv vzzzv zzv zvz zvv zz zvvv zvzv vv vzvv z zvv zv vvvz vz zvz v vzz vz z zzv vzzzz zvz zvvv vz vv zzz vvvvv zvv z vzzzv zzzz zvvzv vv",
            },
            {
              id: "zb",
              levelTitle: "zb",
              text: "zzzz bbbb bbzzz zbzb zz b zz zb b bbbbz zb bb z bzz z b zbz bbbbz bb z bzz zzbbb zb bzb bzzb zb bzb bb z zz z b b zz zzzbz zbb bzbz z b bzzbz bbb bb bz z zb zzzbz zb zzzb bz zbz bzbbb zbzz zbb b bzz zzbz",
            },
            {
              id: "xcv",
              levelTitle: "xcv",
              text: "xxxx cccc vvvv xvcvvcv cvvv xccx vvvcvcv cxvcxccc xv vvxxccv xxxcccv vvxxcvcx cv xvxcvxc cxvxc vcv cvxv xcxvcvv xx vvxvcvvv ccx cxx xvxcvxvx xcxv cc cvvc cxvvx xxvx cxccvc ccx vvccc xx ccxc xvccvxvv xxvxvv",
            },
            {
              id: "zxc",
              levelTitle: "zxc",
              text: "zzzz xxxx cccc zcx xzxzccx cczcxzzz zxzxzcc zzx cxxzzzzc czzzzzc xxcczxx xxzczzz cxzzxz xxzxx zxxzzc ccxzzxcc zcc zczx cxxx xxcx zxx xczx x cxxxccx xccxzx ccxx zxxxxz z cx czxc zczz zx zxxz zz xzcz zxzxczc",
            },
            {
              id: "cvb",
              levelTitle: "cvb",
              text: "cccc vvvv bbbb bcc cvcbv vc vcbvvb ccb bvc bcvbbcb vbvv vc vcb cvbccc bbcbb cbvvbccv bc bvvvccbv v vb vccvbb b cvb bvbcvb vcvvbvv cbcbc c cvccb c bccbcvv vcc cvvc cvvbvcv ccvbvcc vbbbbb bccc c vbbbcv bvvbb",
            },
            {
              id: "zxcvb",
              levelTitle: "zxcvb",
              text: "zzzz xxxx cccc vvvv bbbb cxxbvcxzbcbbbb xxvbzvxbxczb bxxxvbccxvv b czcxbxxbzbx bb bczzbvzzxb xvxxbcvbbzcz zcvz cvcc vxxcb vcczbcvzccb xvbzczx vzczbbcczc cvvzvxxcczcvc cvzxvvz cxvvxxzx bxzzvbczc xv bvccxzcx",
            },
            {
              id: "zxcvb-capital",
              levelTitle: "ZXCVB",
              text: "ZZZZ XXXX CCCC VVVV BBBB VVZC ZVZVVZXZ ZVXXZB VBVVZXXBX CXXVZBCVCCZX CXVZBZXZXC Z ZXZZ XZXXCCVXXVV VBZBC CZB XCZXXBVXZVBCZ XXXBC BXBBCCXCZVZXZX XVVXBXCXBZZ CVCBZCXZB B ZCXBVCCXVVB BXBBXVCZXVCXZC BBXXZV CZBZ",
            },
          ],
        },
        {
          sectionTitle: "Bottom Row Right Hand",
          sectionId: "bottom-row-right-id",
          sectionData: [
            {
              id: "nm",
              levelTitle: "nm",
              text: "nnnn mmmm mnm mnmmn nnn nmmm mnmnm mmmnn n m mn m n mmm mmn mnmnm mnmn n nm mm mnnmm m m mmn mmmm nn nnnn nmm mnn nnn mmn mmnm nn nnmm nmmm nmn mn mmnn m mnnn n m mmnmm nnmn nnn mnn mnmnm mmnmm nnnn nmmmm mm",
            },
            {
              id: "n,",
              levelTitle: "n,",
              text: "nnnn ,,,, nnn ,,, n ,,, nnnn, ,n nnn ,,nn ,n,, n nn nn, nn, ,,,, ,n, ,,,, n, ,n, ,n,n, nn,nn , , nnn,n nnnn, nnnn, ,nnn, ,n,n, ,, ,n n,n,n n, n n,,n, , n,n nnn, , ,nnnn n,n ,,, ,nnn, ,nn,, ,, ,n,,, ,,,n , nn,",
            },
            {
              id: "n.",
              levelTitle: "n.",
              text: "nnnn .... nnnnn .. n... nn. n ... n n .... ..n. n. ...n. ....n n.n.. ...n n..n .nn n.... nn n.nnn n . nn . ...n. nn.n nn..n n.nn .nn.n .. . . .nn n n.nn n.... n. n. .n. n. . nnn. .nnn .. .. .nn nn. n.n .n ...",
            },
            {
              id: "n/",
              levelTitle: "n/",
              text: "nnnn //// /nnn nn/nn /n/n/ nn nn/nn n /n/ n/n nn//n n/n nnn/ n/nn /nn// n// / n///n nnnn/ /n/n // ///// /n//n n/n/n n/n// n/n / n n/nn n/n// n//nn nnnn nn /n ///n/ nnn// //nn/ /nn// n/// nn //// n // n n /n/",
            },
            {
              id: "m,.",
              levelTitle: "m,.",
              text: "mmmm ,,,, .... mmmm, m,m,mm.. ,,m....m ,.m.,m m,m.. .,,,., .,.m ..m ,.., ,,. .mm,,m .,, ,m, ,m,,m,m ,,m.,.,. m,,,, ,m ,. .,mmm,,. mmm,mm,. ,,., ., .,,m. m,m m,,m,,m mm,.,m ..,m,m mm.,,. ..mm,,m ..m..., .,,m.m..",
            },
            {
              id: "nm,",
              levelTitle: "nm,",
              text: "nnnn mmmm ,,,, m mm,nmm, mm,, n,,n, m, ,nm,mm, nn ,mm,mmm ,nmnm,m nmnnnnmm mmnnmn,n nn,n,nn nnmmmn,, ,mnn,,n, mmmmnnm mm,nn,,m m,mn mn,n,n mn n,m n,,,,,,m ,m mm,,mnn ,m,,,mm ,,nmn nmnmn , ,n, m nm, ,nnn,n n,n",
            },
            {
              id: ",./",
              levelTitle: ",./",
              text: ",,,, .... //// ,., .,//. ,,///. ,///. ,//.,,,, ,/..//. //,/,,,/ ,,//./. ... ,//../ ,./.,./. ,.,/, .//...,. /..., ,/,/..,/ ,,,/ ,, ,/ . //../,,. //. ,.//// /./,.. /,. ,.,,// ,,/ ,/ ., ,/.,/,. .,,,././ ,.// ,,.",
            },
            {
              id: "nm,./",
              levelTitle: "nm,./",
              text: "nnnn mmmm ,,,, .... //// ,/nmm,/n/,n mm,,n,m /../.../,..,.. n,m mm /m,,.nmnmmn. mm,,..m,  n,n/ ..,,.nn n/,//m/. ,/./...m ,.nmmnm,.,,n/. ,mmn.n,n.n,./ ,n/mmmm,, nm,m //,/ nn,...,n/,./ m,,n//n,/, ,/.,.n..,n.,",
            },
            {
              id: "nm<>?",
              levelTitle: "NM<>?",
              text: "NNNN MMMM <<<< >>>> ???? ><<M NM>M M<?NN?>M< ? <N>?M< >M?N M>?N ?>?<N>MN N>??? ><?><< N?NN?? NN?M?? <M<>? N>><?< NMM?<><NNNN>M <NM?>?<> NN?< >>MN<MN<>>MNM< <<?N? M<>M< M?N>N<MMN <?N<<>M ??><NM< >N N>N<?<M><N",
            },
          ],
        },
        {
          sectionTitle: "Bottom Row",
          sectionId: "bottom-row-id",
          sectionData: [
            {
              id: "zxnm",
              levelTitle: "zxnm",
              text: "zzzz xxxx nnnn mmmm mmxxzx zxzzzzn mxzzxzx mnn xmxzxn xmmm zxxz xxzm nzzx xz m mmx xzxmxmzzzz mz nxzmmzn nnzz nxzmnmnz mnxnmmmnxxz mznn zmnn xzzmxxx nxnx zzmzx zn xznmxxzmm mzmmnnm mxn mxmmxxnzx xmnmmxmz nxznn",
            },
            {
              id: "zcn,",
              levelTitle: "zcn,",
              text: "zzzz cccc nnnn ,,,, z,,znz,z nn,nnzccznz nc,n,,,z,, ,z czcznzz nc c ,zzc ncccznz, zz,zcnc ,cn,nnn,cz c ,zznz,,zz ,ccn nn,cnn,n n, ,cz z,znz,cnn, ncznn znz cz,c c,nc, cnnznznnzn z,,,z,,,zn ,nzc cnzn,,zczc ,,,znn",
            },
            {
              id: "zvn.",
              levelTitle: "zvn.",
              text: "zzzz vvvv nnnn .... n..nzvzvvzz z..zzv.zvz z znnz.vz. ..n.z .z..n nz..z z n.zvvv.v zvvz .vzn.n.n vvvz ..vzzzzz.v z.znn..n z.vvnn nv z.n nvv.zvvnn vnn v.nznzz.v. vv.zzn z v..vnzv nvn.z. v.v.nzzv vnn ..vv.zz. vnz",
            },
            {
              id: "zbn/",
              levelTitle: "zbn/",
              text: "zzzz bbbb nnnn //// b z / zb bnbnbbbnnbb nb/n/nb/nb n/n/n/bz/b b/nzb bbzzz bzbbz/zz znz /n //bz/ bzb/z/b// z/b//nzbnnz bnzbzzz/zb nz/z/ b///zzzn/ bnnz bbnz/b /z /bnzbz/nn bb bnnb zbzn//bzn /zb/ nn/n/zz// /zn/zz/",
            },
            {
              id: "xcvm,.",
              levelTitle: "xcvm,.",
              text: "xxxx cccc vvvv mmmm ,,,, .... .x.vxm. c,xx,xvmx,v.cvcx ,mmvccv m ,.xcxx., c,xvx.m mvv,,mc,.vc.mc v,. m.xcmvmc,c. ,.m,..x x, x.,.,x.vvv..vv .v vc.,v..ccx,x., .,xm..mxc,.xmv,m m.x.,c ,cvxcxmmxm.,. .xxcx,vvx,vv,v.",
            },
            {
              id: "zxcnm,",
              levelTitle: "zxcnm,",
              text: "zzzz xxxx cccc nnnn mmmm ,,,, m,zzzzznxzmxxcnx n, ,nnxxmxnnzcz, ,,mnxzzxxzmxz m,mxzxcmczzzmxzmm mxzc x,mzn,x,cn,mxxcxm xxc,nzxmnmzx mnnczm,mm zcncmc, x,mmxmxczm,, zzcc mmm,,c,xxzxzm,, ,mxzzmzxmmm,c mmxzxcx,zxmcx",
            },
            {
              id: "cvb,./",
              levelTitle: "cvb,./",
              text: "cccc vvvv bbbb ,,,, .... //// v/. v/,vb/ v ,,/vvc..v. vbccv b,b/, ,/b/c., ,, ..v/bcc.b,vcv ,c.//c,ccv ,b.,c,,/ .bv.cb , /.bc/cvvc.,/.vc/, v/bc/cb b/.b,,v.vvvbv,,/ bc. cv/cb/b/,bbb c/c ,,,/v.c,/c c.b/c/c vc,/,v,./",
            },
            {
              id: "zxcvbnm,./",
              levelTitle: "zxcvbnm,./",
              text: "zzzz xxxx cccc vvvv bbbb nnnn mmmm ,,,, .... //// v/. v/,vb/ v ,,/vvc..v. vbccv b,b/, ,/b/c., ,, ..v/bcc.b,vcv ,c.//c,ccv ,b.,c,,/ .bv.cb , /.bc/cvvc.,/.vc/, v/bc/cb b/.b,,v.vvvbv,,/ bc. cv/cb/b/,bbb c/c ,,,/v.c,/c",
            },
            {
              id: "zxcvbnm<>?-capital",
              levelTitle: "ZXCVBNM<<<<>>>>????",
              text: "ZZZZ XXXX CCCC VVVV BBBB NNNN MMMM <<<< >>>> ???? <?>C?<<<X><<?NXZ<XB>X?NM?<NX><Z<M>V?Z??ZC?>>M<>BB<? BC?M><NN>>>?>>??>?Z?V<<<?N?B<X<<>>X<>>?Z?VNVBZ< X?<M<B<B>>>XX<>Z?<<<>M??><M<V?<<>N?> <?<?V?<?MNV<>Z?>>N>N< >B>XX>",
            },
            {
              id: "zxcvbzxcvbnm,./nm,./",
              levelTitle: "ZXCVBzxcvbNM<<<<>>>>????nm,./",
              text: "zzzz ZZZZ xxxx XXXX cccc CCCC vvvv VVVV bbbb BBBB nnnn NNNN mmmm MMMM ,,,, <<<< .... >>>> //// ???? Z?<zbV>?ncZ<,xbb?B?BB VmNVZn<.ZC?Mc<<<C?zNN>?>.>?Cx,<>C.?/>v>bZx,..n/?Z?C>?.NV?<>M><z<v<cm?z<>,<.VB X >>XB<MVm?V<n",
            },
          ],
        },
        {
          sectionTitle: "English Words",
          sectionId: "all-three-rows-id",
          sectionData: [
            {
              id: "lower-case-1",
              levelTitle: "lower case left hand",
            },
            {
              id: "lower-case-2",
              levelTitle: "lower case right hand",
            },
            {
              id: "lower-case-3",
              levelTitle: "lower case both hands",
            },
            {
              id: "upper-case-1",
              levelTitle: "UPPER CASE LEFT HAND",
            },
            {
              id: "upper-case-2",
              levelTitle: "UPPER CASE RIGHT HAND",
            },
            {
              id: "upper-case-3",
              levelTitle: "UPPER CASE BOTH HANDS",
            },
            {
              id: "camel-case-1",
              levelTitle: "Title Case Left Hand",
            },
            {
              id: "camel-case-2",
              levelTitle: "Title Case: Right Hand",
            },
            {
              id: "camel-case-3",
              levelTitle: "Title Case: Both Hands",
            },
            {
              id: "pascal-case-1",
              levelTitle: "MiXed CasE LeFt HaNd",
            },
            {
              id: "pascal-case-2",
              levelTitle: "MiXed CasE rIgHt HaNd",
            },
            {
              id: "pascal-case-3",
              levelTitle: "MiXed CasE BoTh HanDs",
            },
          ],
        },
      ],
    },
    {
      id: "advanced-id",
      icon: "face",
      title: "Advanced",
      lessonData: [
        {
          sectionTitle: "Number Row",
          sectionId: "number-row-id",
          sectionData: [
            {
              id: "number-row-left",
              levelTitle: "123456",
              text: "1111 2222 3333 4444 5555 6666 152231341 3 526 34232343 223563562324 5461164532154 625 22122621232 632 126545562536 344664 146321241243361 66145512652141225 422625246264366 23645226254 25466425412463543 42525551666665",
            },
            {
              id: "number-row-right",
              levelTitle: "7890-=",
              text: "7777 8888 9999 0000 ---- ==== 808 8908 809-=0977===88 09==8800-==8- 987=77-= 097708 =98=70-7-907-90 =07=98=8899=9= 0 8-==-=980==-7= 978= 98=99070977=9-79 8899-080==9=0 00-=799-888088 907700907=98 7=0=8007-90787 7=0=9",
            },
            {
              id: "number-row-full",
              levelTitle: "1234567890-=",
              text: "1111 2222 3333 4444 5555 6666 7777 8888 9999 0000 ---- ==== 34=16-4=9737903-455550408891571- 7-3585-9663062 181-6=4=855=43-606050-262894 77699322959936092272835790930=926 80=39==-92738022167598-0 456--53208981-99-67140",
            },
            {
              id: "number-row-left-1",
              levelTitle: "!@#$%^",
              text: "!!!! @@@@ #### $$$$ %%%% ^^^^ @^##!#@@$@@%@$# $@@@!^!@!@%^^$!# !@$!#$@^%$^%#@## ^#$^^!# ^#$!@@^%@ $@@$! #^###@@^$@^@! @%@$@@%#$ %^#@%@^%#!!^^^$@# #^$^#$$%@@% $@@##@ $!$#^ %@ %!$@$$$^!#@$!!#$@ ^ !!@^#^^# %@%!@!%^^@!^@##",
            },
            {
              id: "number-row-right-1",
              levelTitle: "&*()_+",
              text: "&&&& **** (((( )))) ____ ++++ _(_&&&&+**& (+*+* ) +&*+&_*)(*&&&_ +(+*_&_*+&*)(& &()&)*_* *)(_)_+ &+ (+&*&( (*+ (*(&++(_+_ _))+()&)_&+&+)_+ +*(&(&&&(_())+ +___+&&&(&& _*)&)&__ &&(_(*+(&&+&*)( ))**(_*((& &_(*__ *(&*+))_)",
            },
            {
              id: "number-left-full-1",
              levelTitle: "123456!@#$%^",
              text: "1111 2222 3333 4444 5555 6666 !!!! @@@@ #### $$$$ %%%% ^^^^ 4@3%%23$2121%!1@3@ !^%^141#$#3$164@1 #5^162^52#426422$ 45$^!#$6^@^!^35^3$162$631$^!%# $26!^3%125@5!$4%@ %5^1^$2# 216!!!!$2$$6#^%$%64@^626^21! 6#1%3$$#%$@%!5 35",
            },
            {
              id: "number-right-full-1",
              levelTitle: "7890-=&*()_+",
              text: "7777 &&&& 8888 **** 9999 (((( 0000 )))) ---- ____ ==== ++++ )8-_+*8- 9*707_-_=9 8)9=9&(_8+-)8=+8 (+_=()&(&-=&*=-0-9-08-*779 -008(=)9&**=88-)+_(7&=)*&&)9-8_ =9-7)8=)08* 0*9_9+(+ -)==*88(&0-+&88++_8+700*-0=(+*(*+(+ &9*)87",
            },
            {
              id: "number-full-1",
              levelTitle: "Full Number Row",
              text: " 1111 !!!! 2222 @@@@ 3333 #### 4444 $$$$ 5555 %%%% 6666 ^^^^ 7777 &&&& 8888 **** 9999 (((( 0000 )))) 0000 )))) ---- ____ ==== ++++ _5*5+((97$+_5%47__(=%$3(98237&29$_@& 76@*!0%3_-!7@8+$_#80!)@85==#*04@-*-+5_06588 29++295",
            },
          ],
        },
        {
          sectionTitle: "Brackets",
          sectionId: "brackets-id",
          sectionData: [
            {
              id: "brackets-1",
              levelTitle: "asdfjkl{}",
              text: "aaaa ssss dddd ffff jjjj kkkk llll ;;;; {{{{ }}}} }fad}djalja skf{adffaasl}saff}}adk klj}{klkj}f}jsl}ajkjkk sj{lk}al{ll{{lksdd}aflj }l}a dkk}kk{dsddf}{l} ljjsfas lsfak{}s{lsfsfaddas} s}df {asl{aafada}fjfads{lf kk}fa}}k",
            },
            {
              id: "brackets-2",
              levelTitle: "asdfjkl[]",
              text: "aaaa s sss dddd ffff jjjj kkkk llll [[[[ ]]]] jladdfjfs[aj[fs]d[ skjll d[klfj[l lss][ddd]as]f]]dljasdskakd da]jld]a[]k]ssljd laasadsl][[dldj [fjdjdasajl]s]]ld]]asdj a]a]sldsjdjfks as[l]d]dd flsjfsafjs]] [ fsd ]",
            },
            {
              id: "brackets-3",
              levelTitle: "asdfjkl{}[]",
              text: "aaaa ssss dddd ffff jjjj kkkk llll [[[[ ]]]] {{{{ }}}} ]jks][l}[][f{{sdafss}jllf{ klf]ddjalkl{lddajka djj[k{la{adk[j slkjjss]ss[}dsdljkk lf{kjd{{}d}{{kkslad{lkls[lk}{fa ]d fs]jfa]l]j[ [{f]ssfskdskks}]f{ljl]sfaja",
            },
            {
              id: "brackets-4",
              levelTitle: "asdfjkl()",
              text: "aaaa ssss dddd ffff jjjj kkkk llll () falkas(aaaj(as(k(klsjja(j dkllafkddkl(lkf(( (kjda)fkda(dkaf)sjlkd fj)s k(asdlka)fs)dj)s)faa )(k(s)afldds(afkl ljajdskfka)ka sksfjllad)dkjs)klks())f l)lkld)(fl(sa(dsdfssfk",
            },
            {
              id: "brackets-5",
              levelTitle: "asdfjkl{}[]()",
              text: "aaaa ssss dddd ffff jjjj kkkk llll {{{{ }}}} [[[[ ]]]] )))) (((( {l{](ld}{l }]d ) sd]k){df)}[slsf(]{(k}{kl[]f ka{ks[)asjdf))d)adaals(k) }ajd{a}d as}dld]dklk{a]j )[ak} sdsfsf (fdfda)s(la}s(skajfdkalk]{{}j[)]j d{s(ka",
            },
          ],
        },
        {
          sectionTitle: "Symbols",
          sectionId: "symbols-id",
          sectionData: [
            {
              id: "symbol-top-left-row-1",
              levelTitle: "`~!@#$%^",
              text: "~~~~ !!!! @@@@ #### $$$$ %%%% ^^^^ @`#^``~`#~^#~@^~~^~~~ #%#%~#$~@`$#% ^$%$^`^@##%`$^~~$ ~`^`^! !$$#$`~~$$@#%`~#%@$ #`^@@~#%!%$$@^`! $`$!$ !~^`^^@$$^!%`!%`%$`%#` ! ^`%^$$^~%!`@^%`#!%`~ $!`#`%@!`~` #^`!!^^~%`^~$!@^^$",
            },
            {
              id: "symbol-top-right-row-1",
              levelTitle: "&*()_+-=",
              text: "&&& **** (((( )))) ____ ++++ ---- ==== ==)-=(__-_== )+--+===_*((-)() =&_(-_&&_+&&_)(= )()&&)_(==&&*_+=*-*+*&+ ) *+=_*_() +)&+)_)*&*&&(--+ &_--=+-_)- )&&*=)_& )+)*))+&)_)*(&&==)_( _*_+*=)_ =&-- *-)&((+&(*&_=++(+_*=*-",
            },
            {
              id: "symbol-top-row-1",
              levelTitle: "~!@#$%^&*()_+-=",
              text: "~~~~ !!!! @@@@ #### $$$$ %%%% ^^^^ &&&& **** (((( )))) ____ ++++ ---- ==== @~*++$@**+*)(-^#_~~^-)!~~)#-!((_(&#- @-#@_*#+%(##-)^%@@*_#-_~&-_@$@_! *#)*~~ ($#~*@)*^^$~&$&)=*()@&$*^%=)@ )&~$*%~%==*~*@@#+- %+%=#@=^@%#*+-^",
            },
            {
              id: "symbol-right-right-col-1",
              levelTitle: "=+[{]}|;':,<.>/?\\\"",
              text: `==== ++++ [[[[ {{{{ ]]]] }}}} |||| ;;;; '''' """" |?.\\:/,:=.][."{<>;\\][;.>+< },+:]"\\;/.<{:[=<>:;["[}?'+[':|,=./>>,}==.\\ |,'?+[{.<?+]?}',<=;+/};][\\[|><{{}\\=]?[><+><+.;[.=+\\ ./\\;/+{>?,';|"]{?[\\/??/?=>\\ [";+?"/}[][}}|;=;`,
            },
            {
              id: "symbol-all-1",
              levelTitle: "`@#$%^&*()_~=+[{]}|;':,<.>/?\\\"",
              text: `\`\`\`\` @@@@ #### $$$$ %%%% ^^^^ &&&& **** (((( )))) ____ ++++ [[[[ ]]]] {{{{ }}}} |||| \\\\\\\\ |||| ???? .... ;;;; :::: '''' """" //// <<<< >>>> ,,,, ~~~~ !!!! @@@@ ####  $$$$ %%%% ^^^^ &&&& **** (((( )))) ____ >>>> ???? """`,
            },
          ],
        },
        {
          sectionTitle: "Letters, Numbers, & Symbols",
          sectionId: "letters-nums-symbols-id",
          sectionData: [
            {
              id: "symbol-words-quotes",
              levelTitle: "Words In Quotes",
            },
            {
              id: "symobol-numbers-quotes",
              levelTitle: "Numbers In Quotes",
            },
            {
              id: "text-in-brackets-quotes",
              levelTitle: "Text In Brackets",
            },
            {
              id: "hashed-tags-quotes",
              levelTitle: "Hash Tags",
            },
            {
              id: "calculations-quotes",
              levelTitle: "Math Equations",
            },
            {
              id: "emails-quotes",
              levelTitle: "Emails",

            },
            {
              id: "money-quotes",
              levelTitle: "Money",
            },
            {
              id: "conditionals-quotes",
              levelTitle: "Conditionals &|!*",
            },
            {
              id: "punctuated-words-quotes",
              levelTitle: "Punctuated words ,.?!",
            }
          ],
        },
        {
          sectionTitle: "Tricky Words",
          sectionId: "tricky-words-id",
          sectionData: [
            {
              id: "tricky-words",
              levelTitle: "Words",
            },
            {
              id: "mixed-case",
              levelTitle: "MiXed CasE",
            },
            {
              id: "tricky-words-symbols",
              levelTitle: "Words & Symbols",
            },
            {
              id: "tricky-mixed-words-symbols",
              levelTitle: "MiXed CaSe & Symbols",
            },
            {
              id: "mixed-case-3",
              levelTitle: "MiXed CaSe & All",
            },
          ],
        },
      ],
    },
    {
      id: "graduation-id",
      icon: "graduationHat",
      title: "Graduation",
      lessonData: [
        {
          sectionTitle: "You Made It",
          sectionId: "you-made-it-id",
          sectionData: [
            {
              id: "congratulations",
              levelTitle: "Congratulations!",
            },
          ],
        },
      ],
    },
    {
      id: "quotes-id",
      icon: "quote",
      title: "Quotes",
      lessonData: [
        {
          sectionTitle: "Quote Section",
          sectionId: "quote-lesson-id",
          sectionData: [
            {
              id: "quote-1",
              levelTitle: "Quote 1",
            },
          ],
        },
      ],
    },
    {
      id: "novels-id",
      icon: "book",
      title: "Novels",
      lessonData: [
        {
          sectionTitle: "First Book Theme",
          sectionId: "first-book-theme-id",
          sectionData: [
            {
              id: "first-book",
              levelTitle: "First Book",
            },
          ],
        },
      ],
    },
    {
      id: "insects-id",
      icon: "bee",
      title: "Insects",
      lessonData: [
        {
          sectionTitle: "Flying Insects",
          sectionId: "fyling-insects-id",
          sectionData: [
            {
              id: "bumble-bees",
              levelTitle: "Bumble Bees",
            },
          ],
        },
      ],
    },
    {
      id: "animals-id",
      icon: "paw",
      title: "Animals",
      lessonData: [
        {
          sectionTitle: "Animal 1",
          sectionId: "Animal-1-id",
          sectionData: [
            {
              id: "first-animal",
              levelTitle: "🦑 First Animal",
            },
          ],
        },
      ],
    },
    {
      id: "biology-id",
      icon: "microscope",
      title: "Biology",
      lessonData: [
        {
          sectionTitle: "First Biology Section",
          sectionId: "first-bio-lesson-id",
          sectionData: [
            {
              id: "bio-text-1",
              levelTitle: "Bio Text 1",
            },
          ],
        },
      ],
    },
    {
      id: "history-id",
      icon: "paperQuill",
      title: "History",
      lessonData: [
        {
          sectionTitle: "Canadian History",
          sectionId: "canadian-history-lesson-id",
          sectionData: [
            {
              id: "history-text-1",
              levelTitle: "History 1",
            },
          ],
        },
      ],
    },
    {
      id: "geography-id",
      icon: "mountain",
      title: "Geography",
      lessonData: [
        {
          sectionTitle: "volcanoes",
          sectionId: "volcanoes-lesson-id",
          sectionData: [
            {
              id: "yellowstone-text-1",
              levelTitle: "Yellowstone",
            },
          ],
        },
      ],
    },
    {
      id: "math-id",
      icon: "math",
      title: "Math",
      lessonData: [
        {
          sectionTitle: "Math",
          sectionId: "math-lesson-id",
          sectionData: [
            {
              id: "math-text-1",
              levelTitle: "Math 1",
            },
          ],
        },
      ],
    },
    {
      id: "law-id",
      icon: "law",
      title: "Law",
      lessonData: [
        {
          sectionTitle: "Criminal Law",
          sectionId: "criminal-law-lesson-id",
          sectionData: [
            {
              id: "criminal-law-text-1",
              levelTitle: "Criminal Law 1",
            },
          ],
        },
      ],
    },
    {
      id: "business-id",
      icon: "suitcase",
      title: "Business",
      lessonData: [
        {
          sectionTitle: "Finance",
          sectionId: "finance-lesson-id",
          sectionData: [
            {
              id: "investing-1",
              levelTitle: "investing",
            },
          ],
        },
      ],
    },
  ];
  return pageData;
}
