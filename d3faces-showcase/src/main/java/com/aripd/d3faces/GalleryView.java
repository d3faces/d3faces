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
package com.aripd.d3faces;

import java.io.File;
import java.io.Serializable;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import jakarta.annotation.PostConstruct;
import jakarta.faces.view.ViewScoped;
import jakarta.inject.Named;
import org.primefaces.shaded.json.JSONArray;

/**
 *
 * @author aripd.com
 */
@Named
@ViewScoped
public class GalleryView implements Serializable {

    private List<File> files;
    private List<Gallery> galleries;
    private List<String> items;
    private JSONArray jsArray;

    public GalleryView() {
    }

    @PostConstruct
    public void init() {
        File file = new File("src/main/webapp/d3faces");
        File[] listFiles = file.listFiles(); // returns an array of all "file objects" for all files in the context folder.
        files = Arrays.asList(listFiles).stream().sorted().collect(Collectors.toList());

        galleries = Arrays.asList(listFiles).stream()
                .map(f -> new Gallery(f.getName()))
                .sorted()
                .collect(Collectors.toList());

        items = Arrays.asList(listFiles).stream()
                .map(f -> f.getName())
                .sorted()
                .collect(Collectors.toList());

        jsArray = new JSONArray(galleries);

    }

    public List<File> getFiles() {
        return files;
    }

    public List<Gallery> getGalleries() {
        return galleries;
    }

    public List<String> getItems() {
        return items;
    }

    public JSONArray getJsArray() {
        return jsArray;
    }

}
