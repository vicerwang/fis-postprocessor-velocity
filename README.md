# fis-postprocessor-velocity
A processor for fis to compile velocity template after standard compiling.

### Usage
```javascript
fis.match("**/page/**.html", {
    postprocessor: fis.plugin("velocity")
});
```

```javascript
root
 ├ page
 | ├ index
 | | | ├ index.html
 | | | ├ index.css
 | | | ├ index.js
 | | | └ index.html.js
 ├ widget
 | ├ header
 | | | ├ header.html
 | | | ├ header.css
 | | | └ header.js
 ├ mock
 | ├ common
 | | | └ common.js
 ```
index.html.js
 ```javascript
module.exports = {
	foo: "bar"
}
```
common.js
 ```javascript
module.exports = {
	math: {
		floor: function(num) {
			return Math.floor(num);
		}
	}
}
```
### Options
<table>
    <tr>
      <th>key</th>
      <th>default</th>
    </tr>
    <tr>
      <td>root</td>
      <td>fis.project.getProjectPath()</td>
    </tr>
    <tr>
      <td>commonMock</td>
      <td>""</td>
    </tr>
</table>

