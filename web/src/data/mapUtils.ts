export const LOT_COORDS: Record<string, { lat: number; lng: number }> = {
  "lot-a":    { lat: 40.0035, lng: -83.0237 },
  "lot-b":    { lat: 40.0048, lng: -83.0370 },
  "lot-c":    { lat: 40.0115, lng: -83.0285 },
  "lot-d":    { lat: 39.9988, lng: -83.0198 },
  "lot-e":    { lat: 40.0042, lng: -83.0148 },
  "garage-1": { lat: 40.0082, lng: -83.0310 },
};

export const OSU_CENTER = { lat: 40.0052, lng: -83.0262 };
export const ZOOM = 16;

export function buildMapHTML(lotsJson: string): string {
  return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"/>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body,#map{width:100%;height:100%;background:#0F0F10}
.leaflet-control-attribution{display:none}
.leaflet-control-zoom{border:none!important}
.leaflet-control-zoom a{background:#1C1C1E!important;color:#F97316!important;border-color:#2C2C2E!important;font-weight:bold}
.lot-label{
  background:rgba(0,0,0,0.72);color:#fff;
  padding:2px 8px;border-radius:10px;
  font-size:11px;font-weight:700;font-family:sans-serif;
  white-space:nowrap;border:1px solid rgba(255,255,255,0.15);
  pointer-events:none;
}
</style>
</head>
<body>
<div id="map"></div>
<script>
var lots = ${lotsJson};
var selectedId = null;
var CAR_COLORS = ['#DC2626','#2563EB','#059669','#D97706','#7C3AED','#0891B2','#DB2777','#64748B','#B45309','#1D4ED8','#065F46','#9333EA'];
var HALF_LAT = 0.00105;
var HALF_LNG = 0.00138;

function postMsg(data){
  var s=JSON.stringify(data);
  if(window.ReactNativeWebView){
    window.ReactNativeWebView.postMessage(s);
  } else {
    try{window.parent.postMessage(s,'*');}catch(e){}
  }
}

var map=L.map('map',{
  center:[${OSU_CENTER.lat},${OSU_CENTER.lng}],
  zoom:${ZOOM},
  zoomControl:false,
  minZoom:13,
  maxZoom:20
});
L.control.zoom({position:'bottomright'}).addTo(map);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{
  subdomains:'abcd',maxZoom:20
}).addTo(map);

function hashId(id){
  var h=5381;
  for(var i=0;i<id.length;i++)h=((h<<5)+h+id.charCodeAt(i))|0;
  return Math.abs(h);
}

function buildLotSVG(lot,selected){
  var rowMap={};
  lot.spots.forEach(function(s){
    if(!rowMap[s.row])rowMap[s.row]=[];
    rowMap[s.row].push(s);
  });
  var rowLabels=Object.keys(rowMap).sort();
  var rows=rowLabels.map(function(r){return{label:r,spots:rowMap[r]};});
  var SW=20,SH=30,LANE=12,GAP=2,LW=13,HP=4,VP=4;
  var maxSpots=Math.max.apply(null,rows.map(function(r){return r.spots.length;}));
  var pairs=[];
  for(var i=0;i<rows.length;i+=2)pairs.push([rows[i],rows[i+1]||null]);
  var svgW=LW+HP+maxSpots*SW+HP;
  var pairH=LANE+SH+GAP+SH+LANE;
  var svgH=VP+pairs.length*pairH+VP;
  var border=selected?'#FFFFFF':'#F97316';
  var borderW=selected?2.5:1.5;
  var p=[];
  p.push('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+svgW+' '+svgH+'">');
  p.push('<rect width="'+svgW+'" height="'+svgH+'" fill="#141B28"/>');
  p.push('<rect width="'+svgW+'" height="'+svgH+'" fill="none" stroke="'+border+'" stroke-width="'+borderW+'" rx="2"/>');
  pairs.forEach(function(pair,pIdx){
    var ty=VP+pIdx*pairH;
    var ay=ty+LANE;
    var by=ay+SH+GAP;
    var bly=by+SH;
    p.push('<rect x="'+LW+'" y="'+ty+'" width="'+(svgW-LW)+'" height="'+LANE+'" fill="rgba(255,255,255,0.03)"/>');
    p.push('<line x1="'+LW+'" y1="'+(ty+LANE/2)+'" x2="'+svgW+'" y2="'+(ty+LANE/2)+'" stroke="rgba(255,220,0,0.4)" stroke-width="1" stroke-dasharray="6,4"/>');
    p.push('<text x="'+(LW/2)+'" y="'+(ay+SH/2+3)+'" text-anchor="middle" fill="rgba(255,255,255,0.45)" font-size="6" font-family="sans-serif" font-weight="bold">'+pair[0].label+'</text>');
    pair[0].spots.forEach(function(spot,col){
      var sx=LW+HP+col*SW;
      if(spot.isOccupied){
        var c=CAR_COLORS[hashId(spot.id)%CAR_COLORS.length];
        p.push('<rect x="'+(sx+1)+'" y="'+(ay+2)+'" width="'+(SW-2)+'" height="'+(SH-4)+'" rx="1.5" fill="'+c+'"/>');
        var wh=Math.max(4,Math.round((SH-4)*0.28));
        p.push('<rect x="'+(sx+2.5)+'" y="'+(ay+3.5)+'" width="'+(SW-5)+'" height="'+wh+'" rx="1" fill="rgba(186,230,253,0.78)"/>');
        p.push('<rect x="'+sx+'" y="'+ay+'" width="'+SW+'" height="'+SH+'" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.4"/>');
      }else{
        p.push('<rect x="'+sx+'" y="'+ay+'" width="'+SW+'" height="'+SH+'" fill="rgba(34,197,94,0.22)" stroke="#22C55E" stroke-width="1.1"/>');
      }
    });
    p.push('<rect x="'+LW+'" y="'+(ay+SH)+'" width="'+(svgW-LW)+'" height="'+GAP+'" fill="#0A0E18"/>');
    if(pair[1]){
      p.push('<text x="'+(LW/2)+'" y="'+(by+SH/2+3)+'" text-anchor="middle" fill="rgba(255,255,255,0.45)" font-size="6" font-family="sans-serif" font-weight="bold">'+pair[1].label+'</text>');
      pair[1].spots.forEach(function(spot,col){
        var sx=LW+HP+col*SW;
        if(spot.isOccupied){
          var c=CAR_COLORS[hashId(spot.id)%CAR_COLORS.length];
          p.push('<rect x="'+(sx+1)+'" y="'+(by+2)+'" width="'+(SW-2)+'" height="'+(SH-4)+'" rx="1.5" fill="'+c+'"/>');
          var wh=Math.max(4,Math.round((SH-4)*0.28));
          p.push('<rect x="'+(sx+2.5)+'" y="'+(by+SH-4-wh-1)+'" width="'+(SW-5)+'" height="'+wh+'" rx="1" fill="rgba(186,230,253,0.78)"/>');
          p.push('<rect x="'+sx+'" y="'+by+'" width="'+SW+'" height="'+SH+'" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.4"/>');
        }else{
          p.push('<rect x="'+sx+'" y="'+by+'" width="'+SW+'" height="'+SH+'" fill="rgba(34,197,94,0.22)" stroke="#22C55E" stroke-width="1.1"/>');
        }
      });
    }
    p.push('<rect x="'+LW+'" y="'+bly+'" width="'+(svgW-LW)+'" height="'+LANE+'" fill="rgba(255,255,255,0.03)"/>');
    p.push('<line x1="'+LW+'" y1="'+(bly+LANE/2)+'" x2="'+svgW+'" y2="'+(bly+LANE/2)+'" stroke="rgba(255,220,0,0.4)" stroke-width="1" stroke-dasharray="6,4"/>');
  });
  p.push('</svg>');
  return p.join('');
}

function dataUrl(svgStr){
  return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svgStr);
}

var overlays={};
var labelMarkers={};

function availColor(lot){
  var avail=lot.spots.filter(function(s){return!s.isOccupied;}).length;
  var pct=avail/lot.spots.length;
  return pct>=0.5?'#16A34A':pct>=0.2?'#D97706':'#DC2626';
}

function makeLabelIcon(lot){
  var avail=lot.spots.filter(function(s){return!s.isOccupied;}).length;
  var total=lot.spots.length;
  var color=availColor(lot);
  var shortName=lot.name.replace('Lot ','').replace('Garage ','G');
  var html='<div class="lot-label" style="border-color:'+color+'66;"><span style="color:'+color+'">●</span> '+shortName+' &nbsp;<b style="color:'+color+'">'+avail+'</b><span style="color:rgba(255,255,255,0.5)">/'+total+'</span></div>';
  return L.divIcon({html:html,className:'',iconSize:[null,null],iconAnchor:[45,2]});
}

lots.forEach(function(lot){
  if(!lot.lat)return;
  var bounds=[[lot.lat-HALF_LAT,lot.lng-HALF_LNG],[lot.lat+HALF_LAT,lot.lng+HALF_LNG]];
  var svg=buildLotSVG(lot,false);
  var overlay=L.imageOverlay(dataUrl(svg),bounds,{opacity:1,interactive:true,crossOrigin:false});
  overlay.addTo(map);
  overlay.on('click',function(){selectLot(lot.id);});
  overlays[lot.id]={overlay:overlay,bounds:bounds};
  var label=L.marker([lot.lat+HALF_LAT+0.0003,lot.lng],{icon:makeLabelIcon(lot),interactive:false,zIndexOffset:500});
  label.addTo(map);
  labelMarkers[lot.id]=label;
});

function selectLot(id){
  if(selectedId===id)return;
  var prev=selectedId;
  selectedId=id;
  if(prev&&overlays[prev]){
    var pl=lots.find(function(l){return l.id===prev;});
    if(pl)overlays[prev].overlay.setUrl(dataUrl(buildLotSVG(pl,false)));
  }
  var sl=lots.find(function(l){return l.id===id;});
  if(sl&&overlays[id])overlays[id].overlay.setUrl(dataUrl(buildLotSVG(sl,true)));
  map.panTo([sl?sl.lat:0,(sl?sl.lng:0)],{animate:true,duration:0.4});
  postMsg({type:'LOT_SELECT',id:id});
}

function deselectAll(){
  if(selectedId&&overlays[selectedId]){
    var sl=lots.find(function(l){return l.id===selectedId;});
    if(sl)overlays[selectedId].overlay.setUrl(dataUrl(buildLotSVG(sl,false)));
  }
  selectedId=null;
}

map.on('click',function(e){
  var onOverlay=false;
  Object.keys(overlays).forEach(function(id){
    if(overlays[id].overlay._image&&overlays[id].overlay.getBounds().contains(e.latlng))onOverlay=true;
  });
  if(!onOverlay){deselectAll();postMsg({type:'DESELECT'});}
});

// Listen for messages from the parent (works for both WebView and web iframe)
function handleCmd(d){
  try{
    var data=typeof d==='string'?JSON.parse(d):d;
    if(data.type==='DESELECT')deselectAll();
    if(data.type==='REFRESH'){
      lots=data.lots;
      lots.forEach(function(lot){
        if(!overlays[lot.id])return;
        var isSel=lot.id===selectedId;
        overlays[lot.id].overlay.setUrl(dataUrl(buildLotSVG(lot,isSel)));
        if(labelMarkers[lot.id])labelMarkers[lot.id].setIcon(makeLabelIcon(lot));
      });
    }
  }catch(err){}
}
document.addEventListener('message',function(e){handleCmd(e.data);});
window.addEventListener('message',function(e){handleCmd(e.data);});

postMsg({type:'READY'});
</script>
</body>
</html>`;
}
