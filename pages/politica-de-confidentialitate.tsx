import { GetStaticProps } from "next";
import MenuHeader from "../components/menuHeader";
import { getAllJobCategories, getMenuItemsByMenuName } from "../lib/api";
import PageHeroSection from "../components/pageHeroSections";
import FooterSection from "../components/footerSection";

const PoliticaDeConfidentialitate = ({ menuItems, jobCategories }) => {
  const image = "/img/job-header.webp";
  const page = {
    title: "Politica de confidențialitate",
  };

  return (
    <div>
      <MenuHeader menuItems={menuItems} />
      <PageHeroSection image={image} page={page}></PageHeroSection>
      <div className="container mx-auto px-4 py-16 text-gray-500 leading-normal">
        <section className="mb-8 leading-normal">
          <h1 className="text-3xl font-normal mb-4 text-cyan-900">
            POLITICĂ DE CONFIDENȚIALITATE
          </h1>
          <p className="font-normal">
            Începând cu data de 25 mai 2018, Regulamentul 2016/679/UE privind
            protecția persoanelor fizice în ceea ce privește prelucrarea datelor
            cu caracter personal și privind libera circulație a acestor date (în
            continuare „Regulamentul”) va fi aplicat de toate statele Uniunii
            Europene. Prin intermediul acestui Regulament se dorește crearea
            unui cadru legislativ unitar și uniform pe teritoriul Uniunii
            Europene care să nu mai necesite măsuri naționale de implementare.
          </p>
        </section>
        <section className="mb-8">
          <h1 className="text-3xl font-normal mb-4 text-cyan-900">
            ACEASTĂ PAGINĂ WEB SE ADRESEAZĂ EXCLUSIV UTILIZATORILOR CU VÂRSTA
            PESTE 18 ANI.
          </h1>
          <p className="font-normal">
            În vederea respectării obligațiilor care ne revin, derivând din
            Regulament, și având în vedere că protecția datelor dvs reprezintă o
            preocupare majoră și constantă pentru noi, am elaborat prezentul
            document, care stabilește{" "}
            <span className="font-semibold">
              categoriile de date cu caracter personal
            </span>{" "}
            pe care le colectăm la vizita dvs pe pagina noastră web,{" "}
            <span className="font-semibold">
              scopul și temeiul prelucrării, durata prelucrării, unde păstrăm și
              cui transmitem aceste date
            </span>
            , precum și{" "}
            <span className="font-semibold">
              drepturile pe care le aveți în calitatea dvs de persoana vizata
            </span>
            , implementate special pentru a asigura protecția drepturilor și
            libertăților fundamentale ale dvs. și în special a dreptului
            acestora la protecția datelor cu caracter personal.
          </p>
        </section>
        <section className="mb-8">
          <h1 className="text-3xl font-normal mb-4 text-cyan-900">
            1. Definiții
          </h1>
          <p className="font-normal">
            <strong>”date cu caracter personal”</strong> orice informații
            privind o persoană fizică identificată sau identificabilă („persoana
            vizată”); o persoană fizică identificabilă este o persoană care
            poate fi identificată, direct sau indirect, în special prin referire
            la un element de identificare, cum ar fi un nume, un număr de
            identificare, date de localizare, un identificator online, sau la
            unul sau mai multe elemente specifice, proprii identității sale
            fizice, fiziologice, genetice, psihice, economice, culturale sau
            sociale.
          </p>
          <p className="font-normal">
            <strong>„prelucrare”</strong> înseamnă orice operațiune sau set de
            operațiuni efectuate asupra datelor cu caracter personal sau asupra
            seturilor de date cu caracter personal, cu sau fără utilizarea de
            mijloace automatizate, cum ar fi colectarea, înregistrarea,
            organizarea, structurarea, stocarea, adaptarea sau modificarea,
            extragerea, consultarea, utilizarea, divulgarea prin transmitere,
            diseminarea sau punerea la dispoziție în orice alt mod, alinierea
            sau combinarea, restricționarea, ștergerea sau distrugerea;
          </p>
          <p className="font-normal">
            <strong>„operator”</strong> înseamnă persoana fizică sau juridică,
            autoritatea publică, agenția sau alt organism care, singur sau
            împreună cu altele, stabilește scopurile și mijloacele de prelucrare
            a datelor cu caracter personal; atunci când scopurile și mijloacele
            prelucrării sunt stabilite prin dreptul Uniunii sau dreptul intern,
            operatorul sau criteriile specifice pentru desemnarea acestuia pot
            fi prevăzute în dreptul Uniunii sau în dreptul intern;
          </p>
          <p className="font-normal">
            <strong>”persoană împuternicită”</strong> înseamnă persoana fizică
            sau juridică, autoritatea publică, agenția sau alt organism care
            prelucrează datele cu caracter personal în numele operatorului;
          </p>
          <p className="font-normal">
            <strong>„destinatar”</strong> înseamnă persoana fizică sau juridică,
            autoritatea publică, agenția sau alt organism căreia (căruia) îi
            sunt divulgate datele cu caracter personal, indiferent dacă este sau
            nu o parte terță.
          </p>
          <p className="font-normal">
            Vă asigurăm că datele dvs. cu caracter personal sunt prelucrate în
            mod legal, echitabil și transparent, doar pentru îndeplinirea
            scopurilor explicite care v-au fost aduse la cunoștință.
          </p>
          <p className="font-normal">
            JOB DATING S.R.L în calitate de operator, prelucrează datele într-un
            mod care asigură securitatea adecvată a datelor cu caracter
            personal.
          </p>
        </section>
        <section className="mb-8">
          <h1 className="text-3xl font-normal mb-4 text-cyan-900">
            2. Datele cu caracter personal pe care le prelucrăm. Scopul.
            Temeiul. Durata Prelucrării
          </h1>
          <p className="font-normal">
            Colectăm de la dvs. doar acele date cu caracter personal care ne
            sunt necesare pentru a vă putea oferi posibilitatea de utilizare a
            paginii noastre web, pentru a vă putea contacta pentru oferirea
            serviciilor și produselor noastre.
          </p>
          <p className="font-normal">
            În general prelucrăm următoarele date cu caracter personal ale dvs.:
          </p>
          <ul className="list-disc pl-5 mb-4 font-normal">
            <li>Nume și prenume</li>
            <li>Număr de telefon</li>
            <li>Adresă de e-mail</li>
            <li>Data nașterii</li>
            <li>Profesia</li>
            <li>Actualul și fostul locul de muncă</li>
            <li>Naționalitatea</li>
            <li>Limbile străine cunoscute</li>
            <li>Starea civilă</li>
            <li>
              Informații legate de studii și pregătire/experiență profesională
            </li>
          </ul>
          <p className="font-normal">
            Fiecare categorie de date va fi colectată în scopuri determinate,
            explicite și legitime și nu sunt prelucrate ulterior într-un mod
            incompatibil cu aceste scopuri și vor fi pe o perioadă care nu
            depășește perioada necesară îndeplinirii scopurilor în care sunt
            prelucrat.
          </p>
          <p className="font-normal">
            Pentru a asigura principiul transparenței informațiilor la
            prelucrarea datelor dvs. cu caracter personal vă comunicăm în cele
            ce urmează modul în care prelucrăm datele tale, scopurile și temeiul
            juridic (baza legală) al activităților prin care prelucrăm datele
            tale.
          </p>
        </section>
        <section className="mb-8">
          <h1 className="text-3xl font-normal mb-4 text-cyan-900">
            COMPLETAREA FORMULARULUI DE CONTACT
          </h1>
          <p className="font-normal">
            Pentru a vă putea contacta în legătură cu produsele JOB DATING S.R.L
            aveți posibilitatea să completați formularul de contact pus la
            dispoziție pe{" "}
            <span className="font-semibold">www.jobdating.ro</span> la secțiunea
            <span className="font-semibold"> Contact</span>.
          </p>
          <p className="font-normal">
            <strong>
              Temeiul prelucrării datelor cu caracter personal îl reprezintă
              interesul legitim al societății de a face recrutări de personal în
              vederea punerii la dispoziția unor terți. Datele dvs. nu vor putea
              fi folosite în alte scopuri și nici nu vor putea face obiectul
              unor decizii automate bazate exclusiv pe prelucrarea automată,
              inclusiv profilare.
            </strong>
          </p>
          <p className="font-normal">
            Datele dvs. cu caracter personal vor fi păstrate de JOB DATING S.R.L
            pe o perioadă de 1 an. Datele dvs. prelucrate la momentul
            completării formularului de contact nu fac obiectul unei decizii
            bazate exclusiv pe prelucrarea automată, inclusiv crearea de
            profiluri, nu vor fi divulgate niciunui terț și nu vor face obiectul
            unul transfer către o țară terță sau o organizație internațională.
          </p>
        </section>
        <section className="mb-8">
          <h1 className="text-3xl font-normal mb-4 text-cyan-900">
            ÎNSCRIERE - ÎNREGISTRARE CV
          </h1>
          <p className="font-normal">
            Pentru a vă putea contacta în vederea oferirii unui loc de muncă
            corespunzător pregătirii dvs. profesionale, aveți posibilitatea să
            completați formularul de CV pus la dispoziție pe
            <span className="font-semibold">www.jobdating.ro</span> sau să ne
            trimiteți CV-ul dvs. la adresa de email{" "}
            <span className="font-semibold">office@jobdating.ro</span> sau
            folosind serviciul{" "}
          </p>
          <p className="font-normal">
            Prin completarea formularului sau trimiterea CV-ului, vă solicităm
            și colectăm de la dvs. următoarele date cu caracter personal:
            numele, prenumele, adresa de email, data nașterii, profesia,
            actualul și fostul locul de muncă, naționalitatea, limbile străine
            cunoscute, starea civilă.
          </p>
          <p className="font-normal">
            <strong>
              Temeiul prelucrării acestot datelor cu caracter personal îl
              reprezintă interesul legitim al societății de a face recrutări de
              personal în vederea punerii la dispoziția unor terți. JOB DATING
              S.R.L va păstra datele dvs. pe o perioadă de 1 an de la data
              primirii CV-ului. Scopul prelucrării datelor îl reprezintă
              contactarea dvs. în vederea oferirii unui loc de muncă
              corespunzător pregătirii dvs. profesionale.
            </strong>
          </p>
          <p className="font-normal">
            <span>
              Datele dvs. nu vor putea fi folosite în alte scopuri și nici nu
              vor putea face obiectul unor decizii automate bazate exclusiv pe
              prelucrarea automată, inclusiv profilare..
            </span>
          </p>
          <p className="font-normal">
            Vă asigurăm de faptul că datele dvs. sunt păstrate în condiții
            corespunzătoare de securitate și că nu vor putea fi folosite în alte
            scopuri decât cele prezentate.
          </p>
          <p className="font-normal">
            Datele dvs. vor putea fi transferate către societățile din Uniunea
            Europeana la dispoziția cărora subscrisa recruteaza personal,
            conform obiectului său de activitate.
          </p>
        </section>
        <section className="mb-8">
          <h1 className="text-3xl font-normal mb-4 text-cyan-900">
            COOKIE-URI
          </h1>
          <p className="font-normal">
            Site-ul <span className="font-semibold">www.jobdating.ro</span>{" "}
            foloseşte cookie-uri de sesiune (obligatorii). Cookie-ul reprezinta
            un fisier de tip „.txt”, oferite browser-ului dvs. de un server web,
            ce poate fi plasat pe hard disk-ul dvs. Majoritatea browserelor sunt
            setate să accepte aceste cookie-uri. Dacă nu doriți acest lucru,
            puteți reseta browser-ul dvs., să fiți anunțați de fiecare dată când
            primiți câte un cookie sau să refuze acceptarea acestor cookie-uri
          </p>
          <p className="font-normal">
            Folosirea mecanismului de tip cookie reprezintă un avantaj în
            folosul vizitatorilor, acesta permiţând memorarea unor opţiuni de
            navigare în site precum limba în care se afişează site-ul, tip de
            filtre care se aplică la afişarea unor anumite pagini, memorarea
            numelui de utilizator şi a parolei pentru un acces rapid la
            conţinutul site-ului. Neacceptarea unui cookie nu înseamnă că
            utilizatorului îi va fi refuzat accesul de navigare în site sau de
            citire a conţinutului acestuia.
          </p>
          <p className="font-normal">
            Cu ajutorul cookie-urilor, proprietarii de site-uri pot monitoriza
            şi segmenta interesele utilizatorilor faţă de anumite zone sau
            aplicaţii ale site-ului, fapt care le permite ulterior îmbunătăţirea
            experinţei de navigare, introducerea unui conţinut relevant pentru
            utilizator etc.
          </p>
          <p className="font-normal">
            JOB DATING S.R.L nu are acces și nu poate controla Coockies setate
            de alte site-uri. Aveți obligația de a accesa și de a citi
            Politicile aplicabile prevăzute pe aceste site-uri. Cookies setate
            de Google Analytics sunt folosite în scop statistic iar cele setate
            de Facebook sunt folosite în scop statistic și de marketing dacă
            v-ați dat consimțământul pentru asta.
          </p>
          <p className="font-normal">
            <span>
              Aceste cookie-uri nu pot fi folosite pentru a vă identifica pe
              dvs.
            </span>
          </p>
          <p className="font-normal">
            Bineînțeles că puteți accesa pagina noastră web și fără cookies.
          </p>
        </section>
        <section className="mb-8">
          <h1 className="text-3xl font-normal mb-4 text-cyan-900">
            3. Securitatea datelor dvs. cu caracter personal
          </h1>
          <p className="font-normal">
            Securitatea datelor dvs. cu caracter personal sunt o prioritate
            pentru noi. Te asigurăm de faptul că orice prelucrare a datelor se
            face cu respectarea principiilor garantate de Regulament și
            prelucrate într-un mod are asigură securitatea adecvată a datelor cu
            caracter personal, inclusiv protecția împotriva prelucrării
            neautorizate sau ilegale și împotriva pierderii, a distrugerii sau a
            deteriorării accidentale, prin luarea de măsuri tehnice sau
            organizatorice corespunzătoare, prin punerea în aplicare a unor
            politici interne adecvate de protecție a datelor.
          </p>
          <p className="font-normal">
            Acest site adoptă toate măsurile de securitate necesare protejării
            informaţiilor personale ale utilizatorilor nostri. În momentul
            completării datelor personale pe site-ul nostru, informaţiile vor fi
            protejate atât offline cât şi online.
          </p>
        </section>
        <section className="mb-8">
          <h1 className="text-3xl font-normal mb-4 text-cyan-900">
            4. Drepturile dvs. în calitate de persoană vizată
          </h1>
          <p className="font-normal">
            <span className="font-semibold">
              Regulamentul 679/2016 asigură protecția drepturilor și
              libertăților fundamentale ale persoanelor fizice și în special a
              dreptului acestora la protecția datelor cu caracter personal.
            </span>
          </p>
          <p className="font-normal">
            <strong>
              În ceea ce privește datele dvs. cu caracter personal, aveți
              dreptul de a solicita exercitarea oricărui din următoarele
              drepturi în vederea garantării protecției datelor dvs. cu caracter
              personal:
            </strong>
          </p>
          <p className="font-normal">
            <span className="font-semibold">
              -dreptul de a avea acces la datele dvs:
            </span>{" "}
            puteți solicita să vi se comunice categoriile de date cu caracter
            personal care sunt prelucrate, scopul în care are loc prelucrarea,
            destinatarii cărora le-au fost sau vor fi comunicate, perioada
            pentru care se preconizează că vor fi stocate sau, dacă acest lucru
            nu este posibil, criteriile utilizate pentru a stabili această
            perioadă; existența unui proces decizional automatizat incluzând
            crearea de profiluri;
          </p>
          <p className="font-normal">
            <span className="font-semibold">
              -dreptul de a solicita rectificarea datelor:
            </span>{" "}
            în situația în care există erori cu privire la datele care vă sunt
            prelucrate, aveți posibilitatea de a solicita corectarea sau
            completarea lor. Subscrisa vom comunica rectificarea fiecărui
            destinatar la care au fost transmise datele, cu excepția cazului în
            care acest lucru se dovedește imposibil sau presupune eforturi
            disproporționate
          </p>
          <p className="font-normal">
            <span className="font-semibold">
              -dreptul de a solicita restricționarea prelucrării datelor:
            </span>{" "}
            aveți dreptul de a solicita restricționarea prelucrării datelor în
            următoarele situații: dacă ați contestat exactitatea datelor, pentru
            o perioadă care ne permite să verificam exactitatea datelor; dacă
            prelucrarea este ilegală, iar dvs. vă opuneți ștergerii datelor cu
            caracter personal, solicitând în schimb restricționarea utilizării
            lor; dacă subscrisa nu mai am nevoie de datele cu caracter personal
            în scopul prelucrării, dar le solicitați pentru constatarea,
            exercitarea sau apărarea unui drept în instanță; dacă v-ați opus
            prelucrării pentru intervalul de timp în care se verifică dacă
            drepturile legitime ale operatorului prevalează asupra drepturilor
            dvs.
          </p>
          <p className="font-normal">
            <span className="font-semibold">
              -dreptul de a solicita ștergerea datelor:
            </span>{" "}
            puteți solicita ștergerea datelor prelucrate, dacă datele nu mai
            sunt necesare pentru îndeplinirea scopurilor pentru care au fost
            colectate sau prelucrate , dacă v- ați retras consimțământul și nu
            există niciun alt temei juridic pentru prelucrarea; dacă vă opuneți
            prelucrării și nu există motive legitime care să prevaleze în ceea
            ce privește prelucrarea; datele cu caracter personal au fost
            prelucrate ilegal; datele cu caracter personal trebuie șterse pentru
            respectarea unei obligații legale; datele cu caracter personal au
            fost colectate în legătură cu oferirea de servicii ale societății
            informaționale.
          </p>
          <p className="font-normal">
            <span className="font-semibold">
              -dreptul de a solicita transferul datelor (la portabilitatea
              datelor):
            </span>
            puteți solicita transferul datelor dvs. către un alt operator dacă
            prelucrarea are la baza consimțământul dvs. și prelucrarea este una
            automată
          </p>
          <p className="font-normal">
            <span className="font-semibold">
              -dreptul de a va opune prelucrării:
            </span>{" "}
            aveți dreptul să vă opuneți în orice moment prelucrării datelor dvs.
            în scop de marketing direct, inclusiv creării de profiluri, în acest
            caz datele dvs. vor fi șterse.
          </p>
        </section>
        <section className="mb-8">
          <h1 className="text-3xl font-normal mb-4 text-cyan-900">
            Toate aceste drepturi pot sa fi exercitate printr-o simplă cerere
            adresată la adresa de email{" "}
            <span className="font-semibold">office@jobdating.ro</span>
          </h1>
          <p className="font-normal">
            Prezenta informare a dvs. este limitată la pagina noastră web și nu
            este valabilă pentru paginile web ale operatorilor terți, care pot
            fi accesate prin intermediul acestei pagini web. Nu avem nicio
            influență asupra prelucrării datelor de către acești operatori terț
            și nu ne asumăm nicio responsabilitate sau răspundere în legătură cu
            aceste pagini web.
          </p>
        </section>
      </div>
      <FooterSection
        menuItems={menuItems}
        jobCategories={jobCategories}
      ></FooterSection>
    </div>
  );
};

export default PoliticaDeConfidentialitate;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allMenuItems = await getMenuItemsByMenuName();
  const jobCategories = await getAllJobCategories();

  return {
    props: { menuItems: allMenuItems, jobCategories: jobCategories },
    revalidate: 10,
  };
};
