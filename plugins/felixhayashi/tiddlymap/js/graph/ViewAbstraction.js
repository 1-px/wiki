"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var r in i){if(Object.prototype.hasOwnProperty.call(i,r)){e[r]=i[r]}}}return e};var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol==="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};var _createClass=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(e,r.key,r)}}return function(t,i,r){if(i)e(t.prototype,i);if(r)e(t,r);return t}}();/* @preserve TW-Guard */
/*\

title: $:/plugins/felixhayashi/tiddlymap/js/ViewAbstraction
type: application/javascript
module-type: library

@preserve

\*/
/* @preserve TW-Guard */var _EdgeType=require("$:/plugins/felixhayashi/tiddlymap/js/EdgeType");var _EdgeType2=_interopRequireDefault(_EdgeType);var _utils=require("$:/plugins/felixhayashi/tiddlymap/js/utils");var _utils2=_interopRequireDefault(_utils);var _environment=require("$:/plugins/felixhayashi/tiddlymap/js/lib/environment");var env=_interopRequireWildcard(_environment);var _exception=require("$:/plugins/felixhayashi/tiddlymap/js/exception");function _interopRequireWildcard(e){if(e&&e.__esModule){return e}else{var t={};if(e!=null){for(var i in e){if(Object.prototype.hasOwnProperty.call(e,i))t[i]=e[i]}}t.default=e;return t}}function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}var ViewAbstraction=function(){function e(t){var i=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};_classCallCheck(this,e);if(t instanceof e){return t}this._registerPaths(t);if(i.isCreate){if(!this.configTRef){var r=_utils2.default.getRandomLabel({plural:true});this.configTRef=$tw.wiki.generateNewTitle($tm.path.views+"/"+r)}this._createView(i)}else if(!e.exists(this.getRoot())){throw new ResourceNotFoundException("ViewAbstraction",t)}}_createClass(e,[{key:"isLocked",value:function e(){return $tw.wiki.isShadowTiddler(this.configTRef)}},{key:"update",value:function e(t){var i=t.changedTiddlers;if(t[env.path.edgeTypes]||_utils2.default.hasKeyWithPrefix(i,this.getRoot())){this._clearCaches();return true}return false}},{key:"addPlaceholder",value:function e(t){_utils2.default.cp(_utils2.default.getTiddlerRef(t),this.snapshotTRef,true)}},{key:"exists",value:function t(){return e.exists(this)}},{key:"getRoot",value:function e(){return this.configTRef}},{key:"getCreationDate",value:function e(t){var i=$tw.wiki.getTiddler(this.configTRef).fields["created"];if(t){return i instanceof Date?$tw.utils.formatDateString(i,"DDth MMM YYYY"):""}return i}},{key:"getLabel",value:function e(){return _utils2.default.getBasename(this.configTRef)}},{key:"destroy",value:function e(){_utils2.default.deleteTiddlers(_utils2.default.getMatches("[prefix["+this.configTRef+"]]"))}},{key:"getOccurrences",value:function e(){var t="[regexp:text[<\\$(tiddlymap|tmap).*?view=."+this.getLabel()+"..*?>]]";return _utils2.default.getMatches(t)}},{key:"rename",value:function t(i){if(typeof i!=="string"){return false}if(_utils2.default.inArray("/",i)){$tm.notify('A view name must not contain any "/"');return false}var r=this.getLabel();var a=env.path.views+"/"+i;var n=this.getRoot();_utils2.default.mv(n,a,true);if($tm.config.sys.defaultView===r){_utils2.default.setEntry($tm.ref.sysUserConf,"defaultView",i)}if($tm.config.sys.liveTab.fallbackView===r){_utils2.default.setEntry($tm.ref.sysUserConf,"liveTab.fallbackView",i)}$tw.wiki.each(function(t,a){if(t.fields["tmap.open-view"]===r){_utils2.default.setField(a,"tmap.open-view",i);return}if(e.exists(a)){var n=new e(a);var l=n.getNodeData();for(var s in l){if(l[s]["open-view"]===r){l[s]["open-view"]=i}}n.saveNodeData(l)}});this._clearCaches();this._registerPaths(i)}},{key:"isEnabled",value:function e(t){return _utils2.default.isTrue(this.getConfig(t),false)}},{key:"getConfig",value:function e(t){var i=this;var r=$tw.wiki.getCacheForTiddler(this.configTRef,"tmap-config",function(){var e=_utils2.default.getTiddler(i.configTRef).fields;return _utils2.default.getPropertiesByPrefix(e,"config.")});var a=t&&_utils2.default.startsWith(t,"config.")?t:"config."+t;return t?r[a]:r}},{key:"setConfig",value:function e(){for(var t=arguments.length,i=Array(t),r=0;r<t;r++){i[r]=arguments[r]}if(i[0]==null){return}if(i.length===1&&_typeof(i[0])==="object"){for(var a in i[0]){this.setConfig(a,i[0][a])}}else if(i.length===2&&typeof i[0]==="string"){var n=_utils2.default.getWithoutPrefix(i[0],"config.");var l=i[1];if(l===undefined){return}var s=this.getConfig();if(l===null){$tm.logger("debug","Removing config",n);delete s["config."+n]}else{if(n==="edge_type_namespace"){var o=l.match(/[^:]+/);l=o?o[0]:""}}$tm.logger("log","Setting config",n,l);s["config."+n]=l;$tw.wiki.addTiddler(new $tw.Tiddler(_utils2.default.getTiddler(this.configTRef),s))}else{throw new(Function.prototype.bind.apply(_exception.InvalidArgumentException,[null].concat(i)))}}},{key:"isLiveView",value:function e(){return this.getLabel()===$tm.misc.liveViewLabel}},{key:"isNodeIncludedById",value:function t(i){var r=$tw.utils.escapeRegExp(e._getNodeIdFilterPart(i));return this.getNodeFilter("raw").match(r)}},{key:"setNodeFilter",value:function e(t,i){t=t.replace(/[\n\r]/g," ");if(this.getNodeFilter("raw")===t){return}_utils2.default.setField(this.nodeFilterTRef,"filter",t);$tm.logger("debug","Node filter set to",t)}},{key:"setEdgeTypeFilter",value:function e(t){t=t.replace(/[\n\r]/g," ");if(this.getEdgeTypeFilter("raw")===t){return}_utils2.default.setField(this.edgeTypeFilterTRef,"filter",t);$tm.logger("debug","Edge filter set to",t)}},{key:"addNode",value:function t(i){if(!this.isNodeIncludedById(i)){if(_utils2.default.isTrue($tm.config.sys.alwaysAddNodeIdToViewFilter)||!_utils2.default.isMatch(i.tRef,this.getNodeFilter("compiled"))){var r=e._getNodeIdFilterPart(i);var a=" ";this.setNodeFilter(this.getNodeFilter("raw")+a+r)}this.saveNodePosition(i)}}},{key:"removeNode",value:function t(i){if(!this.isNodeIncludedById(i)){return false}var r=e._getNodeIdFilterPart(i);var a=this.getNodeFilter("raw").replace(r,"");this.setNodeFilter(a);return true}},{key:"getEdgeTypeFilter",value:function e(t){var i=this;var r=$tw.wiki.getCacheForTiddler(this.edgeTypeFilterTRef,"tmap-edgeTypeFilter",function(){var e=$tm.indeces.allETy;var t=Object.keys(e);var r=$tw.wiki.getTiddler(i.edgeTypeFilterTRef);var a={};a.raw=r&&r.fields.filter||"";a.pretty=_utils2.default.getPrettyFilter(a.raw);a.matches=_utils2.default.getEdgeTypeMatches(a.raw,e);a.whitelist=_utils2.default.getLookupTable(a.matches);return a});return t?r[t]:r}},{key:"isEdgeTypeVisible",value:function e(t){return _utils2.default.isEdgeTypeMatch(_EdgeType2.default.getInstance(t).id,this.getEdgeTypeFilter("raw"))}},{key:"getNodeFilter",value:function e(t){var i=this;var r=$tw.wiki.getCacheForTiddler(this.nodeFilterTRef,"tmap-nodeFilter",function(){var e=_utils2.default.makeHashMap();var t=$tw.wiki.getTiddler(i.nodeFilterTRef);e.raw=t&&t.fields.filter||"";e.pretty=_utils2.default.getPrettyFilter(e.raw);e.compiled=$tw.wiki.compileFilter(e.raw);return e});return t?r[t]:r}},{key:"getNodeData",value:function e(t){var i=this;var r=$tw.wiki.getCacheForTiddler(this.mapTRef,"tmap-map",function(){return _utils2.default.parseFieldData(i.mapTRef,"text",{})});return t?r[t]:r}},{key:"equals",value:function t(i){return i===this||e.exists(i)&&new e(i).getRoot()===this.getRoot()}},{key:"saveNodeData",value:function e(){var t=this.getNodeData();for(var i=arguments.length,r=Array(i),a=0;a<i;a++){r[a]=arguments[a]}if(r.length===2){if(_typeof(r[1])==="object"){if(r[1]===null){delete t[r[0]]}else{t[r[0]]=Object.assign(t[r[0]]||{},r[1])}}}else if(r.length===1&&_typeof(r[0])==="object"){$tm.logger("log","Storing data in",this.mapTRef);Object.assign(t,r[0])}else{throw new(Function.prototype.bind.apply(_exception.InvalidArgumentException,[null].concat(r)))}_utils2.default.writeFieldData(this.mapTRef,"text",t,$tm.config.sys.jsonIndentation)}},{key:"saveNodePosition",value:function e(t){if(t.id&&t.x!=null&&t.y!=null){this.saveNodeData(t.id,{x:t.x,y:t.y})}}},{key:"saveNodePositions",value:function e(t){var i=this.getNodeData();for(var r in t){i[r]=i[r]||{};i[r].x=t[r].x;i[r].y=t[r].y}this.saveNodeData(i)}},{key:"setCentralTopic",value:function e(t){this.setConfig("central-topic",t)}},{key:"saveNodeStyle",value:function e(t,i){var r=this.getNodeData(t)||{};var a={x:r.x,y:r.y};for(var n in r){delete r[n]}this.saveNodeData(t,_extends({},i,a))}},{key:"_registerPaths",value:function t(i,r){this.configTRef=e._getRootPath(i);this.mapTRef=this.configTRef+"/map";this.nodeFilterTRef=this.configTRef+"/filter/nodes";this.edgeTypeFilterTRef=this.configTRef+"/filter/edges";this.snapshotTRef=this.getRoot()+"/snapshot"}},{key:"_clearCaches",value:function e(){_utils2.default.getMatches("[prefix["+this.getRoot()+"]]").forEach(function(e){$tw.wiki.clearCache(e)})}},{key:"_createView",value:function t(){var i=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{},r=i.isForce,a=i.protoView,n=i.isHidden;if(e.exists(this)){if(!r){return}this.destroy()}if(e.exists(a)){_utils2.default.cp(new e(a).getRoot(),this.configTRef,true)}var l={title:this.configTRef,id:_utils2.default.genUUID()};if(!n){l[$tm.field.viewMarker]=true}$tw.wiki.addTiddler(new $tw.Tiddler(_utils2.default.getTiddler(this.configTRef),l));this.setEdgeTypeFilter(env.filter.defaultEdgeTypeFilter)}}],[{key:"_getNodeIdFilterPart",value:function e(t){var i=(typeof t==="undefined"?"undefined":_typeof(t))==="object"?t.id:t;return"[field:tmap.id["+i+"]]"}},{key:"_getRootPath",value:function t(i){if(i instanceof e){return i.configTRef}if(i instanceof $tw.Tiddler){i=i.fields.title}if(typeof i==="string"){var r=_utils2.default.getWithoutPrefix(i,$tm.path.views+"/");if(r&&!_utils2.default.hasSubString(r,"/")){return $tm.path.views+"/"+r}}}},{key:"exists",value:function t(i){if(!i){return false}if(i instanceof e){i=i.configTRef}else{i=e._getRootPath(i)}return _utils2.default.tiddlerExists(i)}}]);return e}();exports.default=ViewAbstraction;
//# sourceMappingURL=./maps/felixhayashi/tiddlymap/js/graph/ViewAbstraction.js.map
