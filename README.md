# InformatikWebsite

## TODO:
- Add Overview to animated slides (& redirect) - DONE
- Add Footer to all pages (with filament roll) (add return to home page) - DONE
- About Page
- Add images and style to category pages - DONE (except for FILAMENT)
- Finally: 
    - Check everything
    - host animation.js on server to not be blocked by CORS when site opened over file:///
    - check links/src/etc
    - remove playground, threejstest, obsolete code
    - possibly add info text file in root folder

## Bugs:
- Scrollable slides on mobile - FIXED
- 3d Assets & Script Module have to be hosted (CORS exception between origin file:/// and script fetching per http://)
- Footer is not shown on main page (animcontainer not detatching from fixed pos)
- Category div appears instantly after animcontainer switches to pos fixed