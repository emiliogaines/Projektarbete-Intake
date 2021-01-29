# Intake (Projektarbete, Frontend och Backend)

Detta projekt är skapat för att underlätta att hålla koll på kalorier som intas.

### Köra projektet

För att köra applikationen, börja med att öppna och köra Visual Studio projektet i backend. 'backend/projektarbete-backend.sln'.


Därefter, navigera till applikationens root-mapp och kör följande kommandon i följd:

* `npm install`
* `npm start`

Ett nytt webbläsarfönster bör öppnas med applikationen igång.

### SOLID
Detta projekt använder sig utav *Single-responsibility principle*-principen där varje klass endast har hand om en del utav mjukvaran.

### Design Pattern
Projektet använder många varianter utav både User samt Food objekt. Dessa har ibland extra fält, såsom hashade lösenord eller användar-id.
På grund utav att man ska undvika att skapa nya objekt hela tiden har det implementerats Mapper Pattern, även känd som Translator Pattern.

## Backend
Projektets backend finner du [Här](https://github.com/emiliogaines/Projektarbete-Intake-Backend).
