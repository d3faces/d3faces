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
package com.aripd.d3faces.boxplot;

import java.io.IOException;
import jakarta.faces.component.UIComponent;
import jakarta.faces.context.FacesContext;
import jakarta.faces.context.ResponseWriter;
import jakarta.faces.render.FacesRenderer;
import org.primefaces.renderkit.CoreRenderer;
import org.primefaces.util.WidgetBuilder;

@FacesRenderer(componentFamily = Boxplot.COMPONENT_FAMILY, rendererType = Boxplot.DEFAULT_RENDERER)
public class BoxplotRenderer extends CoreRenderer {

    @Override
    public void encodeEnd(FacesContext context, UIComponent uiComponent) throws IOException {
        if (context == null) {
            throw new NullPointerException("No context defined!");
        }

        Boxplot component = (Boxplot) uiComponent;

        encodeMarkup(context, component);
        encodeScript(context, component);
    }

    protected void encodeMarkup(FacesContext context, Boxplot component) throws IOException {
        final ResponseWriter writer = context.getResponseWriter();

        writer.startElement("div", component);
        writer.writeAttribute("id", component.getClientId(), null);
        writer.endElement("div");
    }

    protected void encodeScript(FacesContext context, Boxplot component) throws IOException {
        WidgetBuilder wb = getWidgetBuilder(context);
        wb.init(Boxplot.class.getSimpleName(), component);

        if (component.getUrl() != null) {
            wb.attr("url", component.getUrl());
        }

        if (component.getWidth() != null) {
            wb.attr("width", component.getWidth());
        }

        if (component.getHeight() != null) {
            wb.attr("height", component.getHeight());
        }

        wb.finish();
    }

}
