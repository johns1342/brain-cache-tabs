# ToDos

## v0

- [x] add on-demand extension-click dumb search
  - [x] walk the tabs, build json objects
- [x] accept text input and do simple string searching of the json
- [x] get a live-update display/search auto-complete working
- [x] add click selection brings window/tab to front
- [x] add nicer formatting
- [x] add favIcon
- [x] add a **gather** button to pull search results into the current window

## v1

- add view-modes / filters at the top:
  - window hit count summary
    - single click filters by the window
    - double click navigates to the window
  - ordering:
    - last-focused timeline (ascend/descend)
    - alphabetically (ascend/descend)
  - logged-in filter
  - incognito filter (off by default)
  - domain filter (show domain counts with select option)
  - filter tri-state? must-have, exclude, don't care (maybe for certain ones)
      -------------
      | logged in |  the filter name or icon
      |           |
      |     4     |  the filter count
      | -       + |  the filter state: exclude (-), must have (+), or indifferent (or maybe arrows)
      -------------
	- change the colors/highlight to indicate the state of the filter
	- the number should be the number of results affected by the filter state:
		- the number of tabs excluded if -
		- the number of tabs shown that have the value otherwise
  - show counts next to filters
- see if there are some ways to test it
- add license
- release via github
- release via chrome webstore?

## v2

- add save/restore session options
- add session search options
- add GUI page to handle basic session management
- release it!

## future

- add content scraping for search
- add search of current content option
- add search of historical content option
- maybe add external store option
- add config settings like:
  - history expiration
  - white-list / black-list
- add more complex search capabilities
- add auto domain clustering
- add stats / summary page
- add a request monitor and reporting option
- add export/import
- add cloud sync options
- add tab thumbnail option (chrome has a capture interface)

