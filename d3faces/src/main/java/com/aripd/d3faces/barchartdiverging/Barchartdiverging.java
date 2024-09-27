/*
 * The MIT License
 *
 * Copyright © 2024 aripd.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
package com.aripd.d3faces.barchartdiverging;

import jakarta.faces.application.Resource;
import jakarta.faces.application.ResourceDependency;
import jakarta.faces.component.FacesComponent;
import jakarta.faces.component.UIComponentBase;
import jakarta.faces.context.FacesContext;
import org.primefaces.component.api.Widget;

@FacesComponent(value = Barchartdiverging.COMPONENT_TYPE)
@ResourceDependency(library = "barchartdiverging", name = "barchartdiverging.css")
@ResourceDependency(library = "d3", name = "d3.v7.min.js")
@ResourceDependency(library = "barchartdiverging", name = "barchartdiverging.js")
@ResourceDependency(library = "barchartdiverging", name = "primefaces.barchartdiverging.js")
public class Barchartdiverging extends UIComponentBase implements Widget {

    public static final String COMPONENT_TYPE = "com.aripd.d3faces.Barchartdiverging";
    public static final String COMPONENT_FAMILY = "com.aripd.d3faces";
    public static final String DEFAULT_RENDERER = "com.aripd.d3faces.BarchartdivergingRenderer";

    protected enum PropertyKeys {

        URL, WIDTH, HEIGHT;
    }

    @Override
    public String getFamily() {
        return COMPONENT_FAMILY;
    }

    public String getUrl() {
        FacesContext context = FacesContext.getCurrentInstance();
        Resource resource = context.getApplication().getResourceHandler().createResource("barchartdiverging.json", "barchartdiverging");
        String res = resource.getRequestPath();

        return (String) getStateHelper().eval(PropertyKeys.URL, res);
    }

    public void setUrl(String url) {
        getStateHelper().put(PropertyKeys.URL, url);
    }

    public Integer getWidth() {
        return (Integer) getStateHelper().eval(PropertyKeys.WIDTH, 960);
    }

    public void setWidth(Integer width) {
        getStateHelper().put(PropertyKeys.WIDTH, width);
    }

    public Integer getHeight() {
        return (Integer) getStateHelper().eval(PropertyKeys.HEIGHT, 500);
    }

    public void setHeight(Integer height) {
        getStateHelper().put(PropertyKeys.HEIGHT, height);
    }

}
