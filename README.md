# tagit
#### A react component let you edit txt and split to tags

<img src=""/>

```
import Tagit from './tagit'
```

```javascript
      <Tagit value={[]} splitBy={","} style={{width:"200px"}} onChange={(arr,str)=>{
        console.log(arr,str)
      }}></Tagit>
```

OR

```javascript
      <Tagit value={"abc,ccc"} splitBy={","} style={{width:"200px"}} onChange={(arr,str)=>{
        console.log(arr,str)
      }}></Tagit>
```
