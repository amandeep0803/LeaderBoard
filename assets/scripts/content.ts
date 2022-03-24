
import { _decorator, Component, Node, Prefab, instantiate, UITransform, JsonAsset, Label, ScrollView } from 'cc';
const { ccclass, property } = _decorator;

 
@ccclass('content')
export class content extends Component {
    @property({type:Prefab})
    tile:Prefab;
    @property({type:JsonAsset})
    jsonData:JsonAsset;
    @property({type:ScrollView})
    scrollView:ScrollView
    playerDetails:any[]=[];
    targetNode:any;
    targetPosition:number;
    start () {
        let name="demo";
        let data : any = Object.entries(this.jsonData.json);
        let n=data.length;
        let sortedData=data.sort((a,b)=>{
            return b[1].rating-a[1].rating;
        })
        let size=(n+1)*100;
        let parentHeight=this.node.parent.getComponent(UITransform).height;
        this.node.getComponent(UITransform).height=size;
        this.node.setPosition(0,parentHeight*0.5-size*0.5,0);
        let startPosition= size*0.5-this.tile.data.height*0.5-50;
        for(let i=0;i<n;i++){
            let tempNode:any=instantiate(this.tile);
            this.playerDetails.push(tempNode);
            this.node.addChild(tempNode);
            tempNode.getComponent('card').changeDetails(i+1,sortedData[i][1]['name'],sortedData[i][1]["rating"]);
            if(name==sortedData[i][1]['name']){
                tempNode.getComponent('card').colorHighlight();
                this.targetNode=instantiate(this.tile);
                this.targetPosition=-size*0.5+50+(i+1)*100-parentHeight*0.5;
                this.targetNode.getComponent('card').changeDetails(i+1,sortedData[i][1]['name'],sortedData[i][1]["rating"]);
                this.targetNode.getComponent('card').colorHighlight();
                this.node.parent.addChild(this.targetNode);
                this.targetNode.setPosition(0,-(parentHeight/2-this.tile.data.height/2),0);
                if(i<5){
                    this.targetNode.active=false;
                }
            }
            tempNode.setPosition(0,startPosition,0);
            startPosition-=100;
        }
        this.scrollView.node.on('scrolling',this.onScroll,this)
    }
    onScroll(event){
        if(event.getContentPosition().y>this.targetPosition && event.getContentPosition().y<this.targetPosition+500){
            console.log("hello")
            this.targetNode.active=false;
        }
        else if(event.getContentPosition().y>this.targetPosition+500){
            this.targetNode.active=true;
            this.targetNode.setPosition(0,(this.node.parent.getComponent(UITransform).height/2-this.tile.data.height/2),0)
        }
        else{
            this.targetNode.active=true;
            this.targetNode.setPosition(0,-(this.node.parent.getComponent(UITransform).height/2-this.tile.data.height/2),0)
        }
    }
}
// ._getContentBottomBoundary()
//getContentPosition()