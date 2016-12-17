package com.cqut.xiji.tool.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import com.artofsolving.jodconverter.DocumentConverter;
import com.artofsolving.jodconverter.openoffice.connection.OpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.connection.OpenOfficeException;
import com.artofsolving.jodconverter.openoffice.connection.SocketOpenOfficeConnection;
import com.artofsolving.jodconverter.openoffice.converter.OpenOfficeDocumentConverter;

public class DocConverter {
	private String fileName;
	private File pdfFile;
	private File swfFile;
	private File docFile;
	private File newfile;

	public DocConverter(String fileString, String outPath) {
		ini(fileString, outPath);
	}

	/*
	 * 重新设置 file @param fileString
	 */
	public void setFile(String fileString, String outPath) {
		ini(fileString, outPath);
	}

	/*
	 * 初始化 @param fileString
	 */
	private void ini(String fileString, String outPath) {
		fileName = fileString.substring(0, fileString.lastIndexOf("."));
		String ID = EntityIDFactory.createId();
		docFile = new File(fileString);
		pdfFile = new File(outPath + ID + ".pdf");
		swfFile = new File(outPath + ID + ".swf");
		newfile = new File(outPath + ID + ".doc");
		if (docFile.exists()) {
			docFile.renameTo(newfile);
			if (newfile.exists()) {
				System.out.println("存在");
			}
			// file.delete();
			// docFile = null;
		} else {
			System.out.println("不存在");
		}

	}

	/*
	 * 转为PDF @param file
	 */
	private void doc2pdf() throws Exception {
		if (newfile.exists()) {
			if (!pdfFile.exists()) {
				OpenOfficeConnection connection = new SocketOpenOfficeConnection(
						8100);
				try {
					connection.connect();
					DocumentConverter converter = new OpenOfficeDocumentConverter(
							connection);
					converter.convert(newfile, pdfFile);
					// close the connection
					connection.disconnect();
					System.out.println("****pdf转换成功，PDF输出：" + pdfFile.getPath()
							+ "****");
				} catch (java.net.ConnectException e) {
					// ToDo Auto-generated catch block
					e.printStackTrace();
					System.out.println("****swf转换异常，openoffice服务未启动！****");
					throw e;
				} catch (com.artofsolving.jodconverter.openoffice.connection.OpenOfficeException e) {
					e.printStackTrace();
					System.out.println("****swf转换器异常，读取转换文件失败****");
					throw e;
				} catch (Exception e) {
					e.printStackTrace();
					throw e;
				}
			} else {
				System.out.println("****已经转换为pdf，不需要再进行转化****");
			}
			newfile.renameTo(docFile);
			newfile.delete();
		} else {
			System.out.println("****swf转换器异常，需要转换的文档不存在，无法转换****");
		}
	}

	/*
	 * 转换成swf
	 */
	private void pdf2swf() throws Exception {
		Runtime r = Runtime.getRuntime();
		if (!swfFile.exists()) {
			if (pdfFile.exists()) {

				try {
					// 这里根据SWFTools安装路径需要进行相应更改
					Process p = r.exec("F:/OnlineView/SWFTools/pdf2swf.exe "
							+ pdfFile.getPath() + " -o " + swfFile.getPath()
							+ " -T 9");
					System.out.print(loadStream(p.getInputStream()));
					System.err.print(loadStream(p.getErrorStream()));
					System.out.print(loadStream(p.getInputStream()));
					System.err.println("****swf转换成功，文件输出：" + swfFile.getPath()
							+ "****");
					if (pdfFile.exists()) {
						pdfFile.delete();
					}
				} catch (Exception e) {
					e.printStackTrace();
					throw e;
				}

			} else {
				System.out.println("****pdf不存在，无法转换****");
			}
		} else {
			System.out.println("****swf已存在不需要转换****");
		}
	}

	static String loadStream(InputStream in) throws IOException {
		int ptr = 0;
		// 把InputStream字节流 替换为BufferedReader字符流 
		BufferedReader reader = new BufferedReader(new InputStreamReader(in));
		StringBuilder buffer = new StringBuilder();
		while ((ptr = reader.read()) != -1) {
			buffer.append((char) ptr);
		}
		return buffer.toString();
	}

	/*
	 * 转换主方法
	 */
	public boolean conver() {
		if (swfFile.exists()) {
			System.out.println("****swf转换器开始工作，该文件已经转换为swf****");
			return true;
		}
		try {
			doc2pdf();
			pdf2swf();
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

		if (swfFile.exists()) {
			return true;
		} else {
			return false;
		}
	}

	/*
	 * 返回文件路径 @param s
	 */
	public String getswfPath() {
		if (swfFile.exists()) {
			String tempString = swfFile.getPath();
			return tempString;
		} else {
			return "";
		}
	}
}