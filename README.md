A simple adventure game by {who?} based on a simple adventure game engine by [Adam Smith](https://github.com/rndmcnlly).
Test Update
Code requirements:
- **4+ scenes based on `AdventureScene`**: Bedroom, SpookyPath, WitchesHut, MurkyPond, Cemetary
- **2+ scenes *not* based on `AdventureScene`**: Title, Logo (kinda Cheating), GoodEnd, NormalEnd.
- **2+ methods or other enhancement added to the adventure game engine to simplify my scenes**:
    - Enhancement 1: setCollectable(object, message) - makes the object interactive, set mouseover message, and when clicked add it to inventory
    - Enhancement 2: entryMessage(message) - a message that displays on first entry, clicking anywhere on screen will make it fade away.
    - Enhancement 3: setMouseOver(object, mouseOverMsg) - sets the object to interactive, and sets the mouseover message
    - Enhancement 4: setZoneOver(object, mouseOverMsg, newZone) - sets the object to interactive, sets the mouseover message, and sets the gotoscene value
    - Enhancement 5: setDragable(object, mouseOverMsg) - sets the object to interactive, and makes it draggable
    - Enhancement 6: createPortal(x,y,msg,newScene) - spawns a clickable portal sprite with animations, sets the gotoscene destination.


Experience requirements:
- **4+ locations in the game world**: Bedroom, SpookyPath, WitchesHut, MurkyPond, Cemetary
- **2+ interactive objects in most scenes**: Spookypath has a draggable walking stick that collides with the beehive to make honey
- **Many objects have `pointerover` messages**: I made a function for this, there are many flavor messages
- **Many objects have `pointerdown` effects**: every scene has at least 2 pointerdown effects if not more
- **Some objects are themselves animated**: the portal is animated, and collectable items have an animation when you pick them up

Asset sources:
- (For each image/audio/video asset used, describe how it was created. What tool did you use to create it? Was it based on another work? If so, how did you change it, and where can we learn more about the original work for comparison? Use [Markdown link syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#links).)

Code sources:
- `adventure.js` and `index.html` were created for this project [Adam Smith](https://github.com/rndmcnlly) and edited by me.
- `game.js` was sketched by [Adam Smith](https://github.com/rndmcnlly) and rewritten by me.