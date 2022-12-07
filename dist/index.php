<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>RLP SMS</title>
    <meta name="description"
        content="Eine kleine PWA um dem Kollegium die Patientenanmeldung etwas zu erleichtern. Rheinland-Pfalz und ordentliche Patienten-Anmeldung hat was von Bullshit-Bingo spielen. Digitalisierung und moderne Systeme fehlanzeige...">

    <meta property="og:title" content="RLP SMS">
    <meta property="og:url" content="https://rlp-sms.de/">
    <meta property="og:image" content="/icon.png">
    <meta name="color-scheme" content="light dark">
    <link rel="apple-touch-icon" href="/icon.png">
    <script>
        if (window.matchMedia("(prefers-color-scheme: dark)").media === "not all") {
            document.documentElement.style.display = "none";
            document.head.insertAdjacentHTML(
                "beforeend",
                "<link id=\"css\" rel=\"stylesheet\" href=\"css/style.css\" onload=\"document.documentElement.style.display = ''\">"
            );
        }
    </script>
    <link href="css/style-dark.css" rel="stylesheet" media="(prefers-color-scheme: dark)">
    <link href="css/style.css" rel="stylesheet" media="(prefers-color-scheme: light)">
</head>

<body>
    <header class="text-center">
        <picture>
            <source media="(min-width:2000px)" srcset="/img/logo/logo_rlp-sms_2500.png" type="image/png">
            <source media="(min-width:1500px)" srcset="/img/logo/logo_rlp-sms_2000.png" type="image/png">
            <source media="(min-width:1000px)" srcset="/img/logo/logo_rlp-sms_1500.png" type="image/png">
            <source media="(min-width:500px)" srcset="/img/logo/logo_rlp-sms_1000.png" type="image/png">
            <img src="/img/logo/logo_rlp-sms_500.png" class="img-fluid" alt="Logo von RLP SMS">
        </picture>
    </header>
    <main class="container my-5">
        <div class="p-4 pt-lg-5 align-items-center rounded-3 border shadow-lg">
            <h1 class="pb-3">RLP SMS Anmeldung</h1>
            <form class="form-floating needs-validation" novalidate>
                <div class="row g-2">
                    <div class="col-md">
                        <div class="form-floating">
                            <input type="input" class="form-control" id="form-input-rm"
                                placeholder="Rettungsmittel* (z.B.: MZ 99/83-01)" required onchange="persistFunc(this)">
                            <label for="form-input-rm">Rettungsmittel* (z.B.: MZ 99/83-01)</label>
                            <div class="invalid-feedback">
                                Bitte Funkrufnamen angeben!
                            </div>

                        </div>
                    </div>
                    <div class="col-md">
                        <div class="form-floating">
                            <select class="form-select" id="form-select-zlb" aria-label="Auswahl treffen!"
                                placeholder="ZLB Status*" required>
                                <option value="" selected>Zuweisungart wählen!</option>
                                <option value="Grün">Grün</option>
                                <option value="Zwangszuweisung">Zwangseingewiesen</option>
                            </select>
                            <label for="form-select-zlb">ZLB Status*</label>
                            <div class="invalid-feedback">
                                Bitte Auswahl treffen
                            </div>
                        </div>
                    </div>
                    <div class="form-floating">
                        <input type="input" class="form-control" id="form-input-dia" placeholder="Diagnose*" required>
                        <label for="form-input-dia">Diagnose*</label>
                        <div class="invalid-feedback">
                            Bitte Diagnose oder Symptom eingeben!
                        </div>
                    </div>
                    <div class="form-floating">
                        <select class="form-select" id="form-select-sex" aria-label="Geschlecht wählen*" required>
                            <option value="" selected>Geschlecht wählen</option>
                            <option value="d">Divers</option>
                            <option value="w">Weiblich</option>
                            <option value="m">Männlich</option>
                        </select>
                        <label for="form-select-sex">Geschlecht*</label>
                        <div class="invalid-feedback">
                            Bitte Auswahl treffen
                        </div>
                    </div>
                    <div class="input-group py-2">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="birthswitch">
                            <label class="form-check-label" for="birthswitch">Geburtsdatum verwenden</label>
                        </div>
                    </div>
                    <div class="input-group" id="div-form-input-age">
                        <div class="form-floating">
                            <input type="number" class="form-control" id="form-input-age" inputmode="decimal"
                                placeholder="55" required>
                            <label for="form-input-age">Alter*</label>
                            <div class="invalid-feedback">
                                Bitte Alter bzw. ungefähres Alter angeben!
                            </div>
                        </div>
                        <span class="input-group-text">Jahre</span>
                    </div>
                    <div class="input-group" id="div-form-input-birth" style="display: none;">
                        <div class="form-floating">
                            <input type="date" class="form-control" id="form-input-birth" placeholder="05.12.1989">
                            <label for="form-input-birth">Geburtsdatum*</label>
                        </div>
                    </div>
                    <div class="form-floating">
                        <select class="form-select" id="form-select-iso" aria-label="Isolationspflichtig"
                            placeholder="Isolationspflicht*" required>
                            <option value="" selected>Auswahl treffen!</option>
                            <option value="Nein">Nein</option>
                            <option value="Ja">Ja</option>
                            <option value="Unklar">Unklar</option>
                        </select>
                        <label for="form-select-iso">Isolationspflichtig*</label>
                        <div class="invalid-feedback">
                            Ist der Patient isolationspflichtig?
                        </div>
                    </div>
                    <div class="input-group">
                        <div class="form-floating">
                            <input type="number" class="form-control" id="form-input-kg" inputmode="decimal"
                                placeholder="55">
                            <label for="form-input-kg">Gewicht</label>
                        </div>
                        <span class="input-group-text">kg</span>
                    </div>
                    <div class="form-floating">
                        <select class="form-select" id="form-select-mon" aria-label="Monitorpflichtig"
                            placeholder="Monitorpflichtig*" required>
                            <option value="" selected>Auswahl treffen!</option>
                            <option value="Nein">Nein</option>
                            <option value="Ja">Ja</option>
                            <option value="Unklar">Unklar</option>
                        </select>
                        <label for="form-select-mon">Monitorpflichtig*</label>
                        <div class="invalid-feedback">
                            Ist der Patient monitorpflichtig?
                        </div>
                    </div>
                    <div class="input-group">
                        <div class="form-floating">
                            <input type="time" class="form-control" id="form-input-ank"
                                placeholder="Erwartete Ankunftzeit*" required>
                            <label for="form-input-ank">Erwartete Ankunftzeit*</label>
                            <div class="invalid-feedback">
                                Bitte ungefähre Ankunftszeit angeben!
                            </div>
                        </div>
                        <span class="input-group-text">Uhr</span>
                    </div>
                    <div class="form-floating">
                        <input type="input" class="form-control" id="form-input-son" placeholder="Sonstiges">
                        <label for="form-input-son">Sonstiges</label>
                    </div>
                    <div>
                        <p>
                            <small class="text-muted">* Pflichtfelder, die vom Ihnen ausgefüllt werden müssen.</small>
                        </p>
                    </div>
                    <div class="px-5 d-grid gap-2">
                        <button type="submit" class="btn btn-success" type="button" id="fnShareButton">SMS
                            absenden</button>
                        <button type="submit" class="btn btn-success" type="button">Test</button>
                        <button type="reset" class="btn btn-warning" type="button">Zurücksetzen</button>
                    </div>
                </div>
            </form>
        </div>
    </main>
    <footer class="text-center">
        <?php
        class ApplicationVersion
        {
            const MAJOR = 1;
            const MINOR = 2;
            const PATCH = 3;
        
            public static function get()
            {
                $commitHash = trim(exec('git log --pretty="%h" -n1 HEAD'));
        
                $commitDate = new \DateTime(trim(exec('git log -n1 --pretty=%ci HEAD')));
                $commitDate->setTimezone(new \DateTimeZone('UTC'));
        
                return sprintf('v%s.%s.%s-dev.%s (%s)', $commitHash, $commitDate->format('Y-m-d H:i:s'));
            }
        }
        ?>
        <p><small class="text-muted"><?php echo '<a href="https://github.com/sancardriver/rlp-sms/" target="_new">' . ApplicationVersion::get() .'</a>'; ?> coded by J. Starck</small></p>
    </footer>
    <script src="js/script.js"></script>
</body>

</html>