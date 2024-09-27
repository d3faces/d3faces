# D3Faces

Data visualization based on D3 and PrimeFaces

## Licenses

- [D3Faces](https://github.com/d3faces/d3faces/blob/main/LICENSE)
- [D3](https://github.com/d3/d3/blob/main/LICENSE)
- [PrimeFaces](https://github.com/primefaces/primefaces/blob/master/LICENSE)

## Installation

```xml
<dependency>
    <groupId>com.aripd</groupId>
    <artifactId>d3faces</artifactId>
    <version></version>
</dependency>
```

## Usage

### Namespace

```xml
xmlns:d3="d3faces"
```

### Simple page

```xml
<html xmlns="http://www.w3.org/1999/xhtml"
    xmlns:h="jakarta.faces.html"
    xmlns:f="jakarta.faces.core"
    xmlns:d3="d3faces">
    <h:head>
    </h:head>
    <h:body>
      <d3:barchart/>
    </h:body>
</html>
```

