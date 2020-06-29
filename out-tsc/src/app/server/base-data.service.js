import { __decorate } from "tslib";
import { Injectable, EventEmitter } from '@angular/core';
const lessThan = '&lt';
const graterThan = '&gt';
let BaseDataService = class BaseDataService {
    constructor(http) {
        this.http = http;
        this.onSelected = new EventEmitter();
        this.onSearch = new EventEmitter();
        this.jsonPath = 'assets/';
        this.allData = [];
        this.customData = [];
        this.fileNames = [];
    }
    //Get the  Data from Json files
    getJsonData() {
        //Check it the files were already loaded if so return them
        if (this.allData != null && this.allData.length > 0) {
            return this.allData;
        }
        // Get all the files that are in the file names
        for (let i = 0; i < this.fileNames.length; i++) {
            this.http
                .get(`${this.jsonPath}${this.fileNames[i]}.json`)
                .subscribe((data) => {
                data = this.initData(data);
                //Check if it should add to the start of the array wih unshift
                if (this.firstPlaceObj(data)) {
                    this.allData.unshift(data);
                }
                else {
                    this.allData.push(data);
                }
            });
        }
        return this.allData;
    }
    //Search for topics that match the given topic name
    getData(topicName) {
        this.customData.length = 0;
        var searchText = topicName.split(',');
        for (let i = 0; i < this.allData.length; i++) {
            for (let x = 0; x < searchText.length; x++) {
                if (this.matchTopic(this.allData[i], searchText[x])) {
                    this.customData.push(this.allData[i]);
                    continue;
                }
            }
        }
        return this.customData;
    }
    //Call the search event
    search(text) {
        this.onSearch.emit(text);
    }
    //Replace the tags for the correct code and classes
    replaceTags(text) {
        var finalText = text;
        //Img
        finalText = this.replaceText(finalText, '<img ', `<img class="imgObj"`);
        //Remove any lesser than and greater than
        finalText = this.replaceText(finalText, '<app-', `${lessThan}app-`);
        finalText = this.replaceText(finalText, `></`, `${graterThan}${lessThan}/`);
        //Code
        finalText = this.checkForCodes(finalText);
        //Video
        let videoStart = `    
     <iframe width="560" height="315" 
     frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; 
     picture-in-picture" allowfullscreen
     src=" 
     `;
        let videoEnd = `"></iframe>`;
        finalText = this.replaceText(finalText, '[video]', videoStart);
        finalText = this.replaceText(finalText, '[/video]', videoEnd);
        return finalText;
    }
    //Get the text between the given start and the end
    parseBetween(beginString, endString, originalString) {
        var beginIndex = originalString.indexOf(beginString);
        if (beginIndex === -1) {
            return null;
        }
        var beginStringLength = beginString.length;
        var substringBeginIndex = beginIndex + beginStringLength;
        var substringEndIndex = originalString.indexOf(endString, substringBeginIndex);
        if (substringEndIndex === -1) {
            return null;
        }
        return originalString.substring(substringBeginIndex, substringEndIndex);
    }
    //Check if it has code tag if so then change them all
    checkForCodes(text) {
        var theText = text;
        var indexCode = theText.indexOf('[code]');
        while (indexCode != -1) {
            theText = this.changeCode(theText);
            indexCode = theText.indexOf('[code]');
        }
        return theText;
    }
    //Change the given text if it has code tag
    changeCode(theText) {
        //Check if it has code tag
        var index = theText.indexOf('[code]');
        if (index == -1) {
            return theText;
        }
        //Look for the text inside of the code tags
        var foundText = this.parseBetween('[code]', '[/code]', theText);
        var newHtml = foundText;
        //Look if it has html tag
        var divIndex = newHtml.indexOf('</div>');
        if (divIndex != -1) {
            //Remove Comments
            newHtml = this.replaceText(newHtml, '<!', `${lessThan}!`);
            newHtml = this.replaceText(newHtml, '->', `-${graterThan}`);
            //Remove Breaks
            newHtml = this.replaceText(newHtml, '<br />', `${lessThan}br /${graterThan}`);
            //Remove the ones that are not fully closed
            var htmlParts = ['div,br,input,button', 'label', ''];
            for (let i = 0; i < htmlParts.length; i++) {
                newHtml = this.removeGiven(newHtml, htmlParts[i]);
            }
            newHtml = this.checkForHtmls(newHtml);
        }
        //Remove any other less than and greater than
        newHtml = this.replaceText(newHtml, '<', `${lessThan}`);
        newHtml = this.replaceText(newHtml, '>', `${graterThan}`);
        newHtml = this.replaceText(newHtml, '<textarea>"', ``);
        newHtml = this.replaceText(newHtml, '</textarea>"', ``);
        //Set what the text will be replaced for
        var codeText = `<div><pre class="prettyprint linenums codeContainer"> ${newHtml}</pre></div>`;
        //Replace the text
        var theNewText = this.replaceText(theText, `[code]${foundText}[/code]`, codeText);
        return theNewText;
    }
    //Remove the given tag biggining and end < , >
    removeGiven(original, tag) {
        let remove = '';
        remove = this.replaceText(remove, `">`, `"${graterThan}`);
        remove = this.replaceText(remove, `/>`, `/${graterThan}`);
        remove = this.replaceText(original, `<${tag}`, `${lessThan}${tag}`);
        remove = this.replaceText(remove, `</${tag}>`, `${lessThan}/${tag}${graterThan}`);
        return remove;
    }
    //Replace the html tags
    checkForHtmls(text) {
        var tags = ['div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'li', 'ul'];
        tags.forEach((tag) => {
            text = this.removeTo(text, tag);
        });
        return text;
    }
    //Remove < and > to the given text
    removeTo(original, container) {
        let removePs = this.replaceText(original, `<${container}>`, `${lessThan}p${graterThan}`);
        let removePsEnds = this.replaceText(removePs, `</${container}>`, `${lessThan}/${container}${graterThan}`);
        return removePsEnds;
    }
    //Replace the text for a new one
    replaceText(text, original, newText) {
        // The general pattern is = text.split(search).join(replacement)
        var newText = text.split(original).join(newText);
        return newText;
    }
};
BaseDataService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], BaseDataService);
export { BaseDataService };
//# sourceMappingURL=base-data.service.js.map