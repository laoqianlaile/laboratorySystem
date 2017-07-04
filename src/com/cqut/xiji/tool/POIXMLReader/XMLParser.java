package com.cqut.xiji.tool.POIXMLReader;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.util.CellRangeAddress;

import com.cqut.xiji.tool.POIEntity.ColumnWidth;
import com.cqut.xiji.tool.POIEntity.DataArea;
import com.cqut.xiji.tool.POIEntity.DynamicLengthConfig;
import com.cqut.xiji.tool.POIEntity.DynamicLengthReportHeader;
import com.cqut.xiji.tool.POIEntity.FreezePane;
import com.cqut.xiji.tool.POIEntity.HorizontalAlignmen;
import com.cqut.xiji.tool.POIEntity.Point;
import com.cqut.xiji.tool.POIEntity.StaticSingleReportHeader;
import com.cqut.xiji.tool.util.NumCheck;


public class XMLParser {
	private String XMLPath1;
	private String XMLPath2;
	public String parsePath;

	private Map<String, String> dynamicKeyMap;
	private Map<String, DynamicLengthConfig> dynamicLengthMap1;
	private Map<String, DynamicLengthConfig> dynamicLengthMap2;
	private List<Map<String, Object>> dataSource1;
	private List<Map<String, Object>> dataSource2;
	private List<String> dataItemList1;
	private List<String> dataItemList2;
	private List<Integer> pointNumber1;
	private List<Integer> pointNumber2;
	private String sheetname;

	private HeadCollector headCollector1;
	private HeadCollector headCollector2;

	private HSSFWorkbook workbook;
	private HSSFSheet sheet1;
	private HSSFSheet sheet2;
	private List<HSSFRow> rowList1 = new ArrayList<HSSFRow>();
	private List<HSSFRow> rowList2 = new ArrayList<HSSFRow>();

	public XMLParser(String XMLPath, String parsePath, String sheetName,
			Map<String, String> dynamicKeyMap,
			Map<String, DynamicLengthConfig> dynamicLengthMap,
			List<Map<String, Object>> dataSource) {
		this.XMLPath1 = XMLPath;
		this.parsePath = parsePath;
		this.dynamicKeyMap = dynamicKeyMap;
		this.dynamicLengthMap1 = dynamicLengthMap;
		this.dataSource1 = dataSource;

		this.headCollector1 = new HeadCollector(XMLPath);
		this.workbook = new HSSFWorkbook();
		if (sheetName == null || sheetName.equals("")) {
			this.sheet1 = this.workbook.createSheet();
		} else {
			this.sheet1 = this.workbook.createSheet(sheetName);
		}
	}

	public XMLParser(String XMLPath, String sheetName,
			Map<String, String> dynamicKeyMap,
			Map<String, DynamicLengthConfig> dynamicLengthMap,
			List<Map<String, Object>> dataSource) {
		this.XMLPath1 = XMLPath;
		this.dynamicKeyMap = dynamicKeyMap;
		this.dynamicLengthMap1 = dynamicLengthMap;
		this.dataSource1 = dataSource;

		this.headCollector1 = new HeadCollector(XMLPath);
		this.workbook = new HSSFWorkbook();
		if (sheetName == null || sheetName.equals("")) {
			this.sheet1 = this.workbook.createSheet();
		} else {
			this.sheet1 = this.workbook.createSheet(sheetName);
		}
	}

	public XMLParser(String XMLPath, String sheetName,
			Map<String, String> dynamicKeyMap,
			Map<String, DynamicLengthConfig> dynamicLengthMap,
			List<Map<String, Object>> dataSource, List<String> dataItemList) {
		this.XMLPath1 = XMLPath;
		this.dynamicKeyMap = dynamicKeyMap;
		this.dynamicLengthMap1 = dynamicLengthMap;
		this.dataSource1 = dataSource;
		this.dataItemList1 = dataItemList;

		this.headCollector1 = new HeadCollector(XMLPath);
		this.workbook = new HSSFWorkbook();
		if (sheetName == null || sheetName.equals("")) {
			this.sheet1 = this.workbook.createSheet();
		} else {
			this.sheet1 = this.workbook.createSheet(sheetName);
		}
	}

	public XMLParser(String XMLPath, String sheetName,
			Map<String, String> dynamicKeyMap,
			Map<String, DynamicLengthConfig> dynamicLengthMap,
			List<Map<String, Object>> dataSource, List<String> dataItemList,
			List<Integer> pointNumber) {
		this.XMLPath1 = XMLPath;
		this.dynamicKeyMap = dynamicKeyMap;
		this.dynamicLengthMap1 = dynamicLengthMap;
		this.dataSource1 = dataSource;
		this.dataItemList1 = dataItemList;
		this.pointNumber1 = pointNumber;

		this.headCollector1 = new HeadCollector(XMLPath);
		this.workbook = new HSSFWorkbook();
		if (sheetName == null || sheetName.equals("")) {
			this.sheet1 = this.workbook.createSheet();
		} else {
			this.sheet1 = this.workbook.createSheet(sheetName);
		}
	}

	public XMLParser(String XMLPath1, String sheetName1,
			Map<String, DynamicLengthConfig> dynamicLengthMap1,
			List<Map<String, Object>> dataSource1, List<String> dataItemList1,
			List<Integer> pointNumber1, String XMLPath2, String sheetName2,
			Map<String, DynamicLengthConfig> dynamicLengthMap2,
			List<Map<String, Object>> dataSource2, List<String> dataItemList2,
			List<Integer> pointNumber2) {
		this.XMLPath1 = XMLPath1;
		this.XMLPath2 = XMLPath2;
		this.dynamicLengthMap1 = dynamicLengthMap1;
		this.dynamicLengthMap2 = dynamicLengthMap2;
		this.dataSource1 = dataSource1;
		this.dataSource2 = dataSource2;
		this.dataItemList1 = dataItemList1;
		this.dataItemList2 = dataItemList2;
		this.pointNumber1 = pointNumber1;
		this.pointNumber2 = pointNumber2;

		this.headCollector1 = new HeadCollector(XMLPath1);
		this.headCollector2 = new HeadCollector(XMLPath2);
		this.workbook = new HSSFWorkbook();
		if (sheetName1 == null || sheetName1.equals("")) {
			this.sheet1 = this.workbook.createSheet();
		} else {
			this.sheet1 = this.workbook.createSheet(sheetName1);
		}
		if (sheetName2 == null || sheetName2.equals("")) {
			this.sheet2 = this.workbook.createSheet();
		} else {
			this.sheet2 = this.workbook.createSheet(sheetName2);
		}
	}

	public void parse() {
		loadStyle();
		headParse();
		dataArea();
		setUpStyle();
	}

	public void parse1() {
		loadStyle();
		headParse();
		dataArea();
		setUpStyle();
		loadStyle1();
		headParse1();
		dataArea1();
		setUpStyle1();
	}

	public void setUpStyle() {
		// 设置行高
		for (int i = 0; i < rowList1.size(); i++) {
			HSSFRow row = rowList1.get(i);
			row.setHeight((short) 400);
		}
	}

	public void setUpStyle1() {
		// 设置行高
		for (int i = 0; i < rowList2.size(); i++) {
			HSSFRow row = rowList2.get(i);
			row.setHeight((short) 400);
		}
	}

	public void headParse() {
		staticReportHeaderParser();
		dynamicReportHeaderParser();
		freezePane();
	}

	public void headParse1() {
		staticReportHeaderParser1();
		dynamicReportHeaderParser1();
		freezePane1();
	}

	public void write() {
		FileOutputStream outputStream;
		try {
			outputStream = new FileOutputStream(new File(parsePath));
			workbook.write(outputStream);
			outputStream.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public void write(OutputStream output) {
		try {
			workbook.write(output);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private void staticReportHeaderParser() {
		staticSingleReportHeaderParser();
	}

	private void staticReportHeaderParser1() {
		staticSingleReportHeaderParser1();
	}

	private void dynamicReportHeaderParser() {
		dynamicLengthReportHeaderParser();
	}

	private void dynamicReportHeaderParser1() {
		dynamicLengthReportHeaderParser1();
	}

	private void staticSingleReportHeaderParser() {
		List<StaticSingleReportHeader> sSingleList = headCollector1
				.getSSingleHeader();
		if (sSingleList == null) {
			return;
		}
		for (int i = 0; i < sSingleList.size(); i++) {
			StaticSingleReportHeader sSingle = sSingleList.get(i);

			HSSFCellStyle cellStyle = workbook.createCellStyle();
			// 居中：左右，上下
			cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
			cellStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);

			if (sSingle.isUseful()) {
				Point basePoint = sSingle.getBasePoint();
				String title = sSingle.getTitle();
				makeRowExist(basePoint.row);
				HSSFRow row = rowList1.get(basePoint.row);
				HSSFCell cell = row.createCell(basePoint.col);
				cell.setCellValue(title);
				cell.setCellStyle(cellStyle);
			}
		}
	}

	private void staticSingleReportHeaderParser1() {
		List<StaticSingleReportHeader> sSingleList = headCollector2
				.getSSingleHeader();
		if (sSingleList == null) {
			return;
		}
		for (int i = 0; i < sSingleList.size(); i++) {
			StaticSingleReportHeader sSingle = sSingleList.get(i);

			HSSFCellStyle cellStyle = workbook.createCellStyle();
			// 居中：左右，上下
			cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
			cellStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);

			if (sSingle.isUseful()) {
				Point basePoint = sSingle.getBasePoint();
				String title = sSingle.getTitle();
				makeRowExist1(basePoint.row);
				HSSFRow row = rowList2.get(basePoint.row);
				HSSFCell cell = row.createCell(basePoint.col);
				cell.setCellValue(title);
				cell.setCellStyle(cellStyle);
			}
		}
	}

	private void dynamicLengthReportHeaderParser() {
		List<DynamicLengthReportHeader> dLengthList = headCollector1
				.getDLengthHeader();
		if (dLengthList == null) {
			return;
		}

		for (int i = 0; i < dLengthList.size(); i++) {
			DynamicLengthReportHeader dLength = dLengthList.get(i);
			if (dLength.isUseful()) {

				String requireKey = replaceBlank(dLength
						.getDynamicLengthConfigName());
				DynamicLengthConfig config = dynamicLengthMap1.get(requireKey);
				Point basePoint = new Point(config.getBaseRow(),
						config.getBaseCol());
				List<String> reportInfos = config.getAllInfo();
				int rowSpan = config.getRowSpan();
				int colSpan = config.getColSpan();

				// 初始化此动态可变长表头所需要的行
				for (int j = basePoint.row; j < basePoint.row + rowSpan; j++) {
					makeRowExist(j);
				}

				// 用来控制加载表格的初始点
				int dRow = basePoint.row;
				int dCol = basePoint.col;

				HSSFCellStyle cellStyle = workbook.createCellStyle();
				HSSFFont font = workbook.createFont();
				if (config.getFontName() != null
						&& !config.getFontName().equals("")) {
					font.setFontName(config.getFontName());
				}
				if (config.getFontSize() != 0) {
					font.setFontHeightInPoints((short) config.getFontSize());
				}
				cellStyle.setFont(font);
				// 居中：左右，上下
				cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
				cellStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);

				for (int j = 0; j < reportInfos.size(); j++) {
					String title = reportInfos.get(j);
					HSSFCell cell = rowList1.get(dRow).createCell(dCol);
					cell.setCellValue(title);
					cell.setCellStyle(cellStyle);
					CellRangeAddress region = new CellRangeAddress(dRow, dRow
							+ rowSpan - 1, dCol, dCol + colSpan - 1);
					sheet1.addMergedRegion(region);
					dCol += colSpan;
				}
			}
		}
	}

	private void dynamicLengthReportHeaderParser1() {
		List<DynamicLengthReportHeader> dLengthList = headCollector2
				.getDLengthHeader();
		if (dLengthList == null) {
			return;
		}

		for (int i = 0; i < dLengthList.size(); i++) {
			DynamicLengthReportHeader dLength = dLengthList.get(i);
			if (dLength.isUseful()) {

				String requireKey = replaceBlank(dLength
						.getDynamicLengthConfigName());
				DynamicLengthConfig config = dynamicLengthMap2.get(requireKey);
				Point basePoint = new Point(config.getBaseRow(),
						config.getBaseCol());
				List<String> reportInfos = config.getAllInfo();
				int rowSpan = config.getRowSpan();
				int colSpan = config.getColSpan();

				// 初始化此动态可变长表头所需要的行
				for (int j = basePoint.row; j < basePoint.row + rowSpan; j++) {
					makeRowExist1(j);
				}

				// 用来控制加载表格的初始点
				int dRow = basePoint.row;
				int dCol = basePoint.col;

				HSSFCellStyle cellStyle = workbook.createCellStyle();
				HSSFFont font = workbook.createFont();
				if (config.getFontName() != null
						&& !config.getFontName().equals("")) {
					font.setFontName(config.getFontName());
				}
				if (config.getFontSize() != 0) {
					font.setFontHeightInPoints((short) config.getFontSize());
				}
				cellStyle.setFont(font);
				// 居中：左右，上下
				cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
				cellStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);

				for (int j = 0; j < reportInfos.size(); j++) {
					String title = reportInfos.get(j);
					HSSFCell cell = rowList2.get(dRow).createCell(dCol);
					cell.setCellValue(title);
					cell.setCellStyle(cellStyle);
					CellRangeAddress region = new CellRangeAddress(dRow, dRow
							+ rowSpan - 1, dCol, dCol + colSpan - 1);
					sheet2.addMergedRegion(region);
					dCol += colSpan;
				}
			}
		}
	}

	private void freezePane() {
		FreezePane freezePane = headCollector1.getFreezePane();
		if (freezePane == null || !freezePane.isUseful()) {
			return;
		}
		sheet1.createFreezePane(freezePane.colSplit, freezePane.rowSplit);
	}

	private void freezePane1() {
		FreezePane freezePane = headCollector2.getFreezePane();
		if (freezePane == null || !freezePane.isUseful()) {
			return;
		}
		sheet2.createFreezePane(freezePane.colSplit, freezePane.rowSplit);

	}

	private void dataArea() {
		// 检查xml中是否存在dataarea的配置
		DataArea dataArea = headCollector1.getDataArea();
		if (dataArea == null || !dataArea.isUseful()) {
			return;
		}

		// 检查是否存在源数据
		if (dataSource1 == null) {
			return;
		}

		// 初始化数据区的配置数据
		Point basePoint = dataArea.getBasePoint();
		List<String> dataItemList = dataArea.getDataItemList();

		// 如果构造函数传入了数据域的dataItemList，那么默认使用动态的dataItemList
		if (this.dataItemList1 != null) {
			dataItemList = this.dataItemList1;
		}
		List<Integer> colMergeList = dataArea.getColMergeList();
		List<String> trueDataItemList = new ArrayList<String>();
		int rowIndex = basePoint.row;
		int colIndex = basePoint.col;

		// 设置单元格格式
		HSSFCellStyle cellStyle = workbook.createCellStyle(); // 加粗 + 向左
		HSSFFont font1 = workbook.createFont();
		font1.setFontHeightInPoints((short) 11);
		font1.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);

		// 开始填入数据
		for (int i = 0; i < dataSource1.size(); i++) {
			int flag = 0;
			Map<String, Object> data = dataSource1.get(i);
			makeRowExist(rowIndex);
			HSSFRow row = rowList1.get(rowIndex);
			colIndex = basePoint.col;
			for (int j = 0; j < dataItemList.size(); j++) {

				HSSFCell cell = row.createCell(colIndex);
				// 取得相应的列名
				String key = dataItemList.get(j);
				// 如果key是empty也就是空的话，就把empty加入trueDataItemList
				if (key.equals("empty")) {
					trueDataItemList.add("empty");
					cell.setCellValue("");
					colIndex++;
					continue;
				}

				// 根据列名从源数据中取数据
				String value = null;
				Object dataItem = data.get(key);
				// 如果没有取到数据，就直接进行下一条数据的插入，不空格
				if (dataItem == null) {
					value=" ";
					cell.setCellValue(value);
					colIndex++;
					continue;
				}


				if (dataItem instanceof String) {
					value = (String) dataItem;
				} else if (dataItem instanceof Date) {
					value = converToString((Date) dataItem);
				} else {
					value = dataItem.toString();
				}

				if (NumCheck.numCheck(value)) {
					int count = 0;
					if (pointNumber1 != null && pointNumber1.size() != 0) {
						count = pointNumber1.get(j);
				    }
					//String fmt = "#,##0";
					//if (count > 0) {
					//	fmt += ".";
					//	for (int k = 0; k < count; k++) {
					//		fmt += "0";
					//	}
					//}
					//short format = workbook.createDataFormat().getFormat(fmt);
					//cellStyle.setDataFormat(format);
					cellStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
					// 不加粗
					cell.setCellStyle(cellStyle);
					cell.setCellValue(Double.parseDouble(value));
				} else {
					cell.setCellValue(value);
				}

				// 如果key请求到了数据，就把它加入trueDataItemList
				trueDataItemList.add(key);
				colIndex++;
			}
			rowIndex++;
		}

		// 这一部分用来合并列
		for (int i = 0; i < colMergeList.size(); i++) {
			// 需要检查合并的列
			int checkCol = colMergeList.get(i);
			int baseRow = basePoint.row;
			int baseCol = basePoint.col + checkCol;
			// int firstIndex = basePoint.row;
			// int lastIndex = basePoint.col;
			int sameCount = 0;
			String sameValue = null;
			String tempValue = null;

			String itemName = trueDataItemList.get(checkCol);

			for (int j = 0; j < dataSource1.size(); j++) {
				Map<String, Object> dataLine = dataSource1.get(j);
				Object chaosValue = dataLine.get(itemName);
				// 这里修改了
				if (j == 0) {
					if (chaosValue instanceof String) {
						sameValue = (String) chaosValue;
					} else if (chaosValue instanceof Date) {
						sameValue = converToString((Date) chaosValue);
					} else {
						sameValue = chaosValue.toString();
					}
					sameValue = replaceBlank(sameValue);
					sameCount = 0;
				} else {
					if (chaosValue instanceof String) {
						tempValue = (String) chaosValue;
					} else if (chaosValue instanceof Date) {
						tempValue = converToString((Date) chaosValue);
					} else {
						tempValue = chaosValue.toString();
					}
					tempValue = replaceBlank(tempValue);
					// 这里修改了

					if (tempValue.equals(sameValue)) {
						sameCount++;
					} else {
						CellRangeAddress region = new CellRangeAddress(baseRow,
								baseRow + sameCount, baseCol, baseCol);
						sheet1.addMergedRegion(region);
						baseRow += (sameCount + 1);
						sameValue = tempValue;
						sameCount = 0;
					}

					if (j == dataSource1.size() - 1) {

						CellRangeAddress region = new CellRangeAddress(baseRow,
								baseRow + sameCount, baseCol, baseCol);
						sheet1.addMergedRegion(region);
					}
				}
			}
		}
	}

	private void dataArea1() {
		// 检查xml中是否存在dataarea的配置
		DataArea dataArea = headCollector2.getDataArea();
		if (dataArea == null || !dataArea.isUseful()) {
			return;
		}

		// 检查是否存在源数据
		if (dataSource2 == null) {
			return;
		}

		// 初始化数据区的配置数据
		Point basePoint = dataArea.getBasePoint();
		List<String> dataItemList = dataArea.getDataItemList();

		// 如果构造函数传入了数据域的dataItemList，那么默认使用动态的dataItemList
		if (this.dataItemList2 != null) {
			dataItemList = this.dataItemList2;
		}
		List<Integer> colMergeList = dataArea.getColMergeList();
		List<String> trueDataItemList = new ArrayList<String>();
		int rowIndex = basePoint.row;
		int colIndex = basePoint.col;

		// 设置单元格格式
		HSSFCellStyle cellStyle = workbook.createCellStyle(); // 加粗 + 向左
		HSSFFont font1 = workbook.createFont();
		font1.setFontHeightInPoints((short) 11);
		font1.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		// 开始填入数据
		for (int i = 0; i < dataSource2.size(); i++) {
			Map<String, Object> data = dataSource2.get(i);
			makeRowExist1(rowIndex);
			HSSFRow row = rowList2.get(rowIndex);
			colIndex = basePoint.col;
			for (int j = 0; j < dataItemList.size(); j++) {

				HSSFCell cell = row.createCell(colIndex);
				// 取得相应的列名
				String key = dataItemList.get(j);
				// 如果key是empty也就是空的话，就把empty加入trueDataItemList
				if (key.equals("empty")) {
					trueDataItemList.add("empty");
					cell.setCellValue("");
					colIndex++;
					continue;
				}

				// 根据列名从源数据中取数据
				Object dataItem = data.get(key);
				// 如果没有取到数据，就直接进行下一条数据的插入，不空格
				if (dataItem == null) {
					continue;
				}

				String value = null;

				if (dataItem instanceof String) {
					value = (String) dataItem;
				} else if (dataItem instanceof Date) {
					value = converToString((Date) dataItem);
				} else {
					value = dataItem.toString();
				}

				if (NumCheck.numCheck(value)) {
					int count = 0;
					if (pointNumber2 != null && pointNumber2.size() != 0) {
						count = pointNumber2.get(j);
					}
					String fmt = "#,##0";
					if (count > 0) {
						fmt += ".";
						for (int k = 0; k < count; k++) {
							fmt += "0";
						}
					}
					short format = workbook.createDataFormat().getFormat(fmt);

					cellStyle.setDataFormat(format);
					cellStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
					// 不加粗
					cell.setCellStyle(cellStyle);
					cell.setCellValue(Double.parseDouble(value));
				} else {
					cell.setCellValue(value);
				}

				// 如果key请求到了数据，就把它加入trueDataItemList
				trueDataItemList.add(key);
				colIndex++;
			}
			rowIndex++;
		}

		// 这一部分用来合并列
		for (int i = 0; i < colMergeList.size(); i++) {
			// 需要检查合并的列
			int checkCol = colMergeList.get(i);
			int baseRow = basePoint.row;
			int baseCol = basePoint.col + checkCol;
			// int firstIndex = basePoint.row;
			// int lastIndex = basePoint.col;
			int sameCount = 0;
			String sameValue = null;
			String tempValue = null;

			String itemName = trueDataItemList.get(checkCol);

			for (int j = 0; j < dataSource2.size(); j++) {
				Map<String, Object> dataLine = dataSource2.get(j);
				Object chaosValue = dataLine.get(itemName);
				// 这里修改了
				if (j == 0) {
					if (chaosValue instanceof String) {
						sameValue = (String) chaosValue;
					} else if (chaosValue instanceof Date) {
						sameValue = converToString((Date) chaosValue);
					} else {
						sameValue = chaosValue.toString();
					}
					sameValue = replaceBlank(sameValue);
					sameCount = 0;
				} else {
					if (chaosValue instanceof String) {
						tempValue = (String) chaosValue;
					} else if (chaosValue instanceof Date) {
						tempValue = converToString((Date) chaosValue);
					} else {
						tempValue = chaosValue.toString();
					}
					tempValue = replaceBlank(tempValue);
					// 这里修改了

					if (tempValue.equals(sameValue)) {
						sameCount++;
					} else {
						CellRangeAddress region = new CellRangeAddress(baseRow,
								baseRow + sameCount, baseCol, baseCol);
						sheet2.addMergedRegion(region);
						baseRow += (sameCount + 1);
						sameValue = tempValue;
						sameCount = 0;
					}

					if (j == dataSource2.size() - 1) {

						CellRangeAddress region = new CellRangeAddress(baseRow,
								baseRow + sameCount, baseCol, baseCol);
						sheet2.addMergedRegion(region);
					}
				}
			}
		}
	}

	private void loadStyle() {
		setColumnWidth();
		setHorizontalAlignment();
	}

	private void loadStyle1() {
		setColumnWidth1();
		setHorizontalAlignment1();
	}

	public void setHorizontalAlignment() {
		// 水平居左
		HSSFCellStyle cellStyle1 = workbook.createCellStyle();
		cellStyle1.setAlignment(HSSFCellStyle.ALIGN_LEFT);
		cellStyle1.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);

		// 水平居中
		HSSFCellStyle cellStyle2 = workbook.createCellStyle();
		cellStyle2.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		cellStyle2.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);

		// 水平居右
		HSSFCellStyle cellStyle3 = workbook.createCellStyle();
		cellStyle3.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
		cellStyle3.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);

		HorizontalAlignmen horiAligStyle = headCollector1.getHoriAligStyle();
		if (horiAligStyle != null) {
			List<Integer> horiAligStyleList = horiAligStyle.getHoriAligStyleList();
			for (int i = 0; i < horiAligStyleList.size(); i++) {
				if (horiAligStyleList.get(i) == 1) {
					sheet1.setDefaultColumnStyle(i, cellStyle1);
				} else if (horiAligStyleList.get(i) == 2) {
					sheet1.setDefaultColumnStyle(i, cellStyle2);
				} else if (horiAligStyleList.get(i) == 3) {
					sheet1.setDefaultColumnStyle(i, cellStyle3);
				}
			}
		}
	}

	public void setHorizontalAlignment1() {
		// 水平居左
		HSSFCellStyle cellStyle1 = workbook.createCellStyle();
		cellStyle1.setAlignment(HSSFCellStyle.ALIGN_LEFT);
		cellStyle1.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);

		// 水平居中
		HSSFCellStyle cellStyle2 = workbook.createCellStyle();
		cellStyle2.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		cellStyle2.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);

		// 水平居右
		HSSFCellStyle cellStyle3 = workbook.createCellStyle();
		cellStyle3.setAlignment(HSSFCellStyle.ALIGN_RIGHT);
		cellStyle3.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);

		HorizontalAlignmen horiAligStyle = headCollector2.getHoriAligStyle();
		if (horiAligStyle != null) {
			List<Integer> horiAligStyleList = horiAligStyle
					.getHoriAligStyleList();
			for (int i = 0; i < horiAligStyleList.size(); i++) {
				if (horiAligStyleList.get(i) == 1) {
					sheet2.setDefaultColumnStyle(i, cellStyle1);
				} else if (horiAligStyleList.get(i) == 2) {
				sheet2.setDefaultColumnStyle(i, cellStyle2);
			} else if (horiAligStyleList.get(i) == 3) {
					sheet2.setDefaultColumnStyle(i, cellStyle3);
				}
			}
		}
	}

	private void setColumnWidth() {
		ColumnWidth columnWidth = headCollector1.getColumnWidth();
		List<Integer> widthList = columnWidth.getColWidthList();
		for (int i = 0; i < widthList.size(); i++) {
			sheet1.setColumnWidth(i, widthList.get(i));
		}
	}

	private void setColumnWidth1() {
		ColumnWidth columnWidth = headCollector2.getColumnWidth();
		List<Integer> widthList = columnWidth.getColWidthList();
		for (int i = 0; i < widthList.size(); i++) {
			sheet2.setColumnWidth(i, widthList.get(i));
		}
	}

	private void makeRowExist(int row) {
		if (row + 1 > rowList1.size()) {
			int index = rowList1.size();
			int tempSize = rowList1.size();
			for (int i = 0; i < row + 1 - tempSize; i++) {
				rowList1.add(sheet1.createRow(index++));
			}
		}
	}

	private void makeRowExist1(int row) {
		if (row + 1 > rowList2.size()) {
			int index = rowList2.size();
			int tempSize = rowList2.size();
			for (int i = 0; i < row + 1 - tempSize; i++) {
				rowList2.add(sheet2.createRow(index++));
			}
		}
	}

	private static String replaceBlank(String str) {
		String dest = "";
		if (str != null) {
			Pattern p = Pattern.compile("\\s*|\t|\r|\n");
			Matcher m = p.matcher(str);
			dest = m.replaceAll("");
		}
		return dest;
	}

	public static String converToString(Date date) {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		return df.format(date);
	}

}
