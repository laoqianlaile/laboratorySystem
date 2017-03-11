package com.cqut.xiji.service.fileEncrypt;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.security.SecureRandom;

import javax.crypto.Cipher;
import javax.crypto.CipherInputStream;
import javax.crypto.CipherOutputStream;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;

import org.apache.commons.codec.binary.Base64;



public class DES {
	private SecretKey secretKey;
	private   Base64 BASE64 = new Base64();
	private   Charset DEFAULT_CHARSET = Charset.forName("UTF-8");
	private   String PREFIX = "XXXXX";

	 
	public DES(){
	}
	
	public DES(String password) {
		PREFIX = password ;//字符串
		initSecretKey(password);// 生成密匙 文件
	}

	
	/**
	 * 字符串加密--use this 
	 * @param datasource byte[]
	 * @return byte[]
	 */
	/*public String encryptString(String datasource) {
		try {
			// DES算法要求有一个可信任的随机数源
			SecureRandom random = new SecureRandom();
			// Cipher对象实际完成加密操作
			Cipher cipher = Cipher.getInstance("DES");
			// 用密匙初始化Cipher对象
			cipher.init(Cipher.ENCRYPT_MODE, this.secretKey, random);
			// 现在，获取数据并加密
			// 正式执行加密操作
			
			return new String(cipher.doFinal(datasource.getBytes("ISO-8859-1")));
		} catch (Throwable e) {
			e.printStackTrace();
		}
		return null;
	}*/
      /**
       * 
       * 字符串加密
       * @author wzj
       * @date 2017年2月24日 下午10:22:20
       * @param source
       * @return
       */
	   public  String encryptString(String source) {
	        if (!isEmpty(source)) {
	            new Base64();
	            String target = PREFIX + source;
	            byte[] bytes = BASE64.encode(target.getBytes(DEFAULT_CHARSET));
	            return new String(bytes, DEFAULT_CHARSET);
	        }

	        return source;
	    }
       /**
        * 字符串解密
        * features or effect
        * @author wzj
        * @date 2017年2月24日 下午10:22:38
        * @param source
        * @return
        */
	    public  String decryptString(String source) {
	        if (!isEmpty(source)) {
	            byte[] bytes = BASE64.decode(source.getBytes(DEFAULT_CHARSET));
	            String target = new String(bytes, DEFAULT_CHARSET);
	            return target.startsWith(PREFIX) ? target.substring(PREFIX.length()) : target;
	        }

	        return source;
	    }
	    private  boolean isEmpty(String str) {
	        return str == null || str.length() == 0;
	    }

	/**
	 * 字符串解密
	 * features or effect
	 * @author wzj
	 * @date 2017年2月23日 下午9:19:25
	 * @param src
	 * @return
	 * @throws Exception
	 */
	/*public String decryptString(String src) throws Exception {
		// DES算法要求有一个可信任的随机数源
		SecureRandom random = new SecureRandom();
		// Cipher对象实际完成解密操作
		Cipher cipher = Cipher.getInstance("DES");
		// 用密匙初始化Cipher对象
		cipher.init(Cipher.DECRYPT_MODE, this.secretKey, random);
		// 真正开始解密操作
		
		return  new String( cipher.doFinal(src.getBytes("ISO-8859-1")) );
	}
	*/
	/**
	 * 文件加密
	 * 文件file进行加密并保存目标文件destFile中
	 * @param file 要加密的文件 如c:/test/srcFile.txt
	 * @param destFile 加密后存放的文件名 如c:/加密后文件.txt
	 */
	public void encryptFile(String file, String destFile) throws Exception {
		// DES算法要求有一个可信任的随机数源
		SecureRandom random = new SecureRandom();
		Cipher cipher = Cipher.getInstance("DES");
		cipher.init(Cipher.ENCRYPT_MODE, this.secretKey,random);
		
		InputStream is = new FileInputStream(file);
		OutputStream out = new FileOutputStream(destFile);
		CipherInputStream cis = new CipherInputStream(is, cipher);
		byte[] buffer = new byte[1024];
		int r;
		while ((r = cis.read(buffer)) > 0) {
			out.write(buffer, 0, r);
		}
		cis.close();
		is.close();
		out.close();
		System.out.println("加密路径 ："+file);
		File fe = new File(file);
		if (fe.exists()) {
			fe.delete();
		}
	}

	/**
	 * 文件解密
	 * 文件采用DES算法解密文件
	 * @param file 已加密的文件 如c:/加密后文件.txt * 
	 * @param destFile 解密后存放的文件名 如c:/test/解密后文件.txt
	 */
	public void decryptFile(String file, String dest) throws Exception {
		// DES算法要求有一个可信任的随机数源
		SecureRandom random = new SecureRandom();
		Cipher cipher = Cipher.getInstance("DES");
		cipher.init(Cipher.DECRYPT_MODE, this.secretKey,random);
		
		InputStream is = new FileInputStream(file);
		OutputStream out = new FileOutputStream(dest);
		CipherOutputStream cos = new CipherOutputStream(out, cipher);
		byte[] buffer = new byte[1024];
		int r;
		while ((r = is.read(buffer)) >= 0) {
			System.out.println();
			cos.write(buffer, 0, r);
		}
		cos.close();
		out.close();
		is.close();
	}
	
	/**
	 * 根据字符串参数生成secretKey
	 */
	public void initSecretKey(String password) {
		try {
			// 创建一个DESKeySpec对象
			DESKeySpec desKey = new DESKeySpec(password.getBytes());
			// 创建一个密匙工厂
			SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
			// 将DESKeySpec对象转换成SecretKey对象
			SecretKey secretKey = keyFactory.generateSecret(desKey);
			this.secretKey = secretKey;
			keyFactory=null;
		} catch (Exception e) {
			throw new RuntimeException(
					"Error initializing SqlMap class. Cause: " + e);
		}
	}

	public SecretKey getSecretKey() {
		return secretKey;
	}

	public void setSecretKey(SecretKey secretKey) {
		this.secretKey = secretKey;
	}
}
