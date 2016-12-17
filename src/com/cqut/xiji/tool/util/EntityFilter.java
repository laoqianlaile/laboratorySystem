package com.cqut.xiji.tool.util;

import com.cqut.xiji.entity.base.Entity;

public class EntityFilter implements ClassFilter{

	@Override
	public boolean accept(Class clazz) {
		return clazz.getSuperclass().equals(Entity.class);
	}

}
