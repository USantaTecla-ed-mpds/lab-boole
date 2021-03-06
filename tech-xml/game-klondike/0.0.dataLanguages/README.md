# game-klondike.0.0.dataLanguages
Universo Santa Tecla  
[uSantaTecla@gmail.com](mailto:uSantaTecla@gmail.com)  
  
## requirements 

## Artists
* Oscar Quintero
* Fernando Cortés
* Borja Coll


```xml
<?xml version="1.0" encoding="UTF-8"?>
<klondike>
    <player>
        <playerId> 1291 </playerId>
        <playerName> Setillo </playerName>
    </player>

    <piles>
        <stock id="stock"/>
        <waste id="waste"/>
        <tableaus>
            <tableau id="t1"/>
            <tableau id="t2"/>
            <tableau id="t3"/>
            <tableau id="t4"/>
            <tableau id="t5"/>
            <tableau id="t6"/>
            <tableau id="t7"/>
        </tableaus>
        <foundations>
            <foundation id="fClubs"/>
            <foundation id="fHearts"/>
            <foundation id="fSpades"/>
            <foundation id="fDiamonds"/>
        </foundations>
    </piles>

    <actionsNames>
        <actionName id="moveStockToWaste"/>
        <actionName id="moveWasteToTableau"/>
        <actionName id="moveTableauToTableau"/>
        <actionName id="moveTableauToFoundation"/>
        <actionName id="moveWasteToFoundation"/>
    </actionsNames>

    <cards>
        <card id="c1">
            <suite> clubs </suite>
            <color> black  </color>
            <value> ace </value>
        </card>
        ...
        <card id="c12">
            <suite> clubs </suite>
            <color> black  </color>
            <value> king </value>
        </card>
        <card id="h1">
            <suite> hearths </suite>
            <color> red  </color>
            <value> ace </value>
        </card>
        ...
        <card id="h12">
            <suite> hearths </suite>
            <color> red  </color>
            <value> king </value>
        </card>
        ...
        <card id="s12">
            <suite> spades </suite>
            <color> black  </color>
            <value> king </value>
        </card>
        ...
        <card id="d12">
            <suite> diamonds </suite>
            <color> red  </color>
            <value> king </value>
        </card>
    </cards>
    
    <actions>
        <action>
            <actionId> 0 </actionId>
            <actionName id="moveWasteToFoundation"/>
            <movement>
                <card idref="c1"/>
                <from idref="waste"/>
                <to idref="fClubs"/>
            </movement>
        </action>
       <action>
            <actionId> 1 </actionId>
            <actionName idref="moveTableauToTableau"/>
            <movement>
                <card idref="s11"/>
                <from idref="t2"/>
                <to idref="t1"/>
            </movement>
        </action>
       <action>
            <actionId> 1 </actionId>
            <actionName idref="moveStockToWaste"/>
            <movement>
                <card idref="h2"/>
                <from idref="stock"/>
                <to idref="waste"/>
            </movement>
        </action>

        ...

        <action>
            <actionId> n-1 </actionId>
            <actionName idref="moveTableauToFoundation"/>
            <movement>
                <card idref="d12"/>
                <from idref="t7"/>
                <to idref="fDiamonds"/>
                <foundationCompleted idref="fDiamonds"/> 
            </movement>
        </action>

        ...

        <action>
            <actionId> n </actionId>
            <gameCompleted/>
            <actionName idref="moveTableauToFoundation"/>
            <movement>
                <card idref="h12"/>
                <from idref="t4"/>
                <to idref="fHearts"/>
                <foundationCompleted idref="fDiamonds"/> 
                <foundationCompleted idref="fSpaces"/> 
                <foundationCompleted idref="fClubs"/> 
                <foundationCompleted idref="fHearts"/> 
            </movement>
        </action>

    </actions>

</klondike>
```
